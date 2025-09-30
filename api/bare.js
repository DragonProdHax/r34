import { createBareServer } from '@tomphttp/bare-server-node';

const bareServer = createBareServer('/seal/');

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Handle the request
  try {
    if (bareServer.shouldRoute(req)) {
      await bareServer.routeRequest(req, res);
    } else {
      res.status(404).json({ error: 'Not found' });
    }
  } catch (error) {
    console.error('Bare server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
