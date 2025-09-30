import apps from '/src/data/apps.json';

const gFilters = (apps.games || [])
  .filter(game => /^https?:\/\//.test(game.url))
  .map(game => ({
    url: new URL(game.url).hostname.replace(/^www\./, ''),
    type: 'scr',
  }));

export const CONFIG = {
  bUrl: 'https://tomp.app/',
  ws: `${location.protocol === 'https:' ? 'wss:' : 'ws:'}//${location.host}/wisp/`,
  transport: '/epoxy/index.mjs',
  baremod: '/baremod/index.mjs',
  unsupported: [],
  // Optional friendly titles for specific hostnames
  titles: [
    { url: 'austinisd.net', title: 'Roblox' },
  ],
  filter: [
    { url: 'neal.fun', type: 'scr' },
    { url: 'geforcenow.com', type: 'scr' },
    { url: 'spotify.com', type: 'scr' },
    // Force plain iframe (no proxy) for Roblox via Austin ISD launch URL
    { url: 'austinisd.net', type: 'raw' },
    ...gFilters,
  ],
};
