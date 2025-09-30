importScripts("/scram/scramjet.all.js");

const scramjet = new ScramjetServiceWorker();

self.addEventListener("fetch", (event) => {
  if (scramjet.route(event)) {
    return scramjet.fetch(event);
  }
});

self.addEventListener("message", (event) => {
  scramjet.message(event);
});
