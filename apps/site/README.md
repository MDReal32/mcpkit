# @usemcpkit/site

The landing page at [mcpkit.mdreal.org](https://mcpkit.mdreal.org): a static Astro site, private, not published to npm.

```bash
yarn workspace @usemcpkit/site dev      # http://localhost:4321
yarn nx run @usemcpkit/site:build       # lint, typecheck, then astro build into build/
```

The server catalog is not part of the build. The page fetches the registry's
[`index.json`](https://mdreal32.github.io/mcpkit/index.json) each time it loads and renders one card per server, so a
new server shows up as soon as the registry is deployed. A failed fetch shows the reason and a retry button.

The promo video is not in `public/`: `.github/workflows/site.yml` renders it with `yarn workspace @usemcpkit/video site`
and copies `usemcpkit.mp4` and `poster.jpg` into `build/video/` before deploying. Locally the video is empty unless you
copy them there yourself.

## Hosting

`wrangler.toml` deploys the Worker `usemcpkit-site`:

- `build/` is served as static assets, with `404.html` for unknown paths;
- the Worker owns the custom domain `mcpkit.mdreal.org`;
- `worker/main.ts` runs only for `/api/*` and `/v1/*` and forwards those requests to the analytics Worker `mcpkit`
  through the `ANALYTICS` service binding: `/api/*` is its own API (`POST /api/v1/use`), and CLIs of `0.9.0` still post
  usage to `https://mcpkit.mdreal.org/v1/use`. Every other path is a static asset of the site.

## Cloudflare setup, once

1. Create an API token from the **Edit Cloudflare Workers** template, scoped to your account and the `mdreal.org` zone,
   and add it to the GitHub repository's secrets as `CLOUDFLARE_API_TOKEN`, with your account id as
   `CLOUDFLARE_ACCOUNT_ID`.
2. Deploy the analytics Worker, which no longer has a route of its own, so that it gives up `mcpkit.mdreal.org`:
   `yarn nx run @usemcpkit/analytics:deploy`. If the domain is still listed under the `mcpkit` Worker's
   **Settings → Domains & Routes** afterwards, remove it there.
3. Deploy the site right after step 2, so the gap stays short: locally after `wrangler login`, or by re-running the
   **Site** workflow from the Actions tab (it shows up there once `site.yml` is on master; the run that merge starts
   fails while the analytics Worker still holds the domain or the secrets are missing):

   ```bash
   yarn nx run @usemcpkit/site:build
   yarn workspace @usemcpkit/site exec wrangler deploy
   ```

   Wrangler adds the custom domain and its DNS record. Between steps 2 and 3, usage reports from `0.9.0` CLIs get no
   answer.
4. Check that `https://mcpkit.mdreal.org` shows the page and that a `POST` to `/api/v1/use` and to `/v1/use` still answers `204` or `400`,
   not `404`.

After that, every push to master that touches `apps/site` or `apps/video` deploys again.
