# @usemcpkit/analytics

A Cloudflare Worker that counts which tools the CLI is used with. Private, not published to npm.

## What is collected

Per `call_tool` request the CLI sends the tool id (for example `git:github:repos:get`); older CLIs also send their version and OS, which the Worker ignores. No arguments, results, credentials, install id or IP address are sent or stored. The Worker keeps one row per tool with its overall count: no day, version or OS.

Users turn it off with `USEMCPKIT_TELEMETRY=0` or `DO_NOT_TRACK=1`; `usemcpkit serve` prints this notice on stderr when it is on. `USEMCPKIT_ANALYTICS_URL` overrides the endpoint.

## Deploy

Run once, after `yarn workspace @usemcpkit/analytics exec wrangler login`:

```bash
yarn nx run @usemcpkit/analytics:init
```

Put the printed `database_id` into `wrangler.toml`, then:

```bash
yarn nx run @usemcpkit/analytics:db:migrate
yarn nx run @usemcpkit/analytics:deploy
```

`deploy` runs `db:migrate` first. The schema lives in `migrations/`, applied once each, in a transaction, by `wrangler d1 migrations apply`. `0002_merge_usage_by_tool.sql` turns the old rows per day, tool, version and OS into one row per tool: the counts are summed, and the old table is dropped only after a check that the total count and the number of tools match. If either differs, the migration rolls back and the old table stays as it was. D1 Time Travel can still restore the database to a point before the migration.

The Worker has no route of its own: the landing page's `usemcpkit-site` Worker (`apps/site`) owns `mcpkit.mdreal.org`, the host the TypeScript CLI of `0.9.0` reports to (its `DEFAULT_ANALYTICS_URL`), and hands `/api/*` and `/v1/*` to this one through a service binding. It answers `POST /api/v1/use`, and `POST /v1/use` for the old CLIs. Deploy this Worker before the site, since the site's binding names it; the Rust CLI sends no usage reports yet (`docs/rust-port.md`). With Cloudflare's git integration leave the build command empty and use `npx wrangler deploy --config apps/analytics/wrangler.toml` as the deploy command.

## Read the numbers

```bash
yarn nx run @usemcpkit/analytics:db:top
```
