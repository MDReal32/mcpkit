import { handleRequest } from "./handle-request";

// biome-ignore lint/style/noDefaultExport: Cloudflare loads the worker from the default export
export default { fetch: handleRequest };
