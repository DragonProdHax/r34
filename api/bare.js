import { createBareServer } from '@tomphttp/bare-server-node';

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
  const bareServer = createBareServer('/seal/');
  
  // Handle the request
  if (bareServer.shouldRoute(req)) {
    bareServer.routeRequest(req, res);
  } else {
    res.status(404).json({ error: 'Not found' });
  }
}
