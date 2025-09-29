import { createBareServer } from '@tomphttp/bare-server-node';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Create bare server instance
  const bareServer = createBareServer('/wisp/');
  
  // Handle the request
  if (bareServer.shouldRoute(req)) {
    bareServer.routeRequest(req, res);
  } else {
    res.status(404).json({ error: 'Not found' });
  }
}
