require("dotenv").config();
import http from "http";
import { Client } from "@notionhq/client";

const notionDatabaseId = process.env.NOTION_DATABASE_ID;
const notionSecret = process.env.NOTION_SECRET;

if (!notionDatabaseId || !notionSecret) {
  throw Error("Must define NOTION_SECRET and NOTION_DATABASE_ID in env");
}

const notion = new Client({
  auth: notionSecret,
});

const host = "localhost";
const port = 8000;

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204); // No content
    res.end();
    return;
  }

  if (req.method === "POST" && req.url === "/") {
    let body = "";
    req.on("data", chunk => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      try {
        const filters = JSON.parse(body);

        const query = await notion.databases.query({
          database_id: notionDatabaseId,
          filter: filters,
        });

        const list = query.results.map(row => mapNotionData(row.properties));

        res.writeHead(200);
        res.end(JSON.stringify(list));
      } catch (error) {
        console.error('Error processing request:', error);
        res.writeHead(400);
        res.end(JSON.stringify({ error: "Invalid request body" }));
      }
    });
  } else if (req.method === "GET" && req.url === "/") {
    try {
      const query = await notion.databases.query({
        database_id: notionDatabaseId,
      });

      const list = query.results.map(row => mapNotionData(row.properties));

      res.writeHead(200);
      res.end(JSON.stringify(list));
    } catch (error) {
      console.error('Error querying Notion database:', error);
      res.writeHead(500);
      res.end(JSON.stringify({ error: "Error querying Notion database" }));
    }
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: "Resource not found" }));
  }
});

function mapNotionData(data: any) {
  return {
    status: data.status?.status?.name || null,
    accountOwner: data["account owner"]?.rich_text?.[0]?.plain_text || null,
    company: data.company?.rich_text?.[0]?.plain_text || null,
    priority: data.priority?.select?.name || null,
    estimatedValue: data["estimated value"]?.number || null,
    name: data.name?.title?.[0]?.plain_text || null
  };
}

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
