export default {
	prefix: "/scram/service/",
	codec: "xor",
	config: "/scram/scramjet.config.js",
	files: {
		wasm: "/scram/scramjet.wasm.js",
		worker: "/scram/scramjet.worker.js",
		client: "/scram/scramjet.client.js",
		shared: "/scram/scramjet.shared.js",
		sync: "/scram/scramjet.sync.js"
	}
};