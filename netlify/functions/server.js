import dotenv from "dotenv";
import { createServer, ServerResponse } from "node:http";
import { logging, server as wisp } from "@mercuryworkshop/wisp-js/server";
import { createBareServer } from "@tomphttp/bare-server-node";

dotenv.config();
ServerResponse.prototype.setMaxListeners(50);

const bare = createBareServer("/seal/");
logging.set_level(logging.NONE);

Object.assign(wisp.options, {
  dns_method: "resolve",
  dns_servers: ["1.1.1.3", "1.0.0.3"],
  dns_result_order: "ipv4first",
});

export const handler = async (event, context) => {
  const { httpMethod, path, headers, body, queryStringParameters } = event;
  
  // Handle proxy endpoints
  if (path.startsWith("/assets/img/")) {
    const imgPath = path.replace("/assets/img/", "");
    try {
      const res = await fetch(`https://dogeub-assets.pages.dev/img/${imgPath}`);
      if (!res.ok) return { statusCode: res.status, body: "" };
      const buffer = await res.arrayBuffer();
      return {
        statusCode: 200,
        headers: { "Content-Type": res.headers.get("content-type") || "image/png" },
        body: Buffer.from(buffer).toString("base64"),
        isBase64Encoded: true
      };
    } catch {
      return { statusCode: 500, body: "" };
    }
  }

  if (path === "/js/script.js") {
    try {
      const res = await fetch("https://byod.privatedns.org/js/script.js");
      if (!res.ok) return { statusCode: res.status, body: "" };
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/javascript" },
        body: await res.text()
      };
    } catch {
      return { statusCode: 500, body: "" };
    }
  }

  if (path === "/ds") {
    return {
      statusCode: 302,
      headers: { Location: "https://discord.gg/ZBef7HnAeg" },
      body: ""
    };
  }

  if (path === "/return") {
    const q = queryStringParameters?.q;
    if (!q) {
      return {
        statusCode: 401,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "query parameter?" })
      };
    }
    try {
      const res = await fetch(`https://duckduckgo.com/ac/?q=${encodeURIComponent(q)}`);
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: await res.text()
      };
    } catch {
      return {
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "request failed" })
      };
    }
  }

  // Default 404
  return {
    statusCode: 404,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ error: "Not Found" })
  };
};
