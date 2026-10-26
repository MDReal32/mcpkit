import { handleRequest } from "./http";

// biome-ignore lint/style/noDefaultExport: Cloudflare loads the worker from the default export
export default { fetch: handleRequest };
