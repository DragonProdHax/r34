import { createBareServer } from '@tomphttp/bare-server-node';
import { WebSocketServer } from 'ws';

const bareServer = createBareServer('/wisp/');

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Handle WebSocket upgrade for Wisp
  if (req.headers.upgrade === 'websocket') {
    const wss = new WebSocketServer({ noServer: true });
    
    wss.handleUpgrade(req, req.socket, Buffer.alloc(0), (ws) => {
      // Handle Wisp WebSocket connection
      ws.on('message', (data) => {
        // Forward to bare server or handle wisp protocol
        console.log('Wisp WebSocket message received');
      });
    });
    return;
  }

  // Handle HTTP requests
  try {
    if (bareServer.shouldRoute(req)) {
      await bareServer.routeRequest(req, res);
    } else {
      res.status(404).json({ error: 'Not found' });
    }
  } catch (error) {
    console.error('Wisp server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
