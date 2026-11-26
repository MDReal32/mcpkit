import type { SiteWorkerEnv } from "./site-worker-env";

/**
 * Runs only for the `run_worker_first` paths in `wrangler.toml`: `/api/*` is the analytics Worker's, and `/v1/*` is
 * where CLIs of `0.9.0` report usage. Every other path is a static asset of the site.
 */
const forwardToAnalytics = (request: Request, env: SiteWorkerEnv) => env.ANALYTICS.fetch(request);

// biome-ignore lint/style/noDefaultExport: Cloudflare loads the worker from the default export
export default { fetch: forwardToAnalytics };
