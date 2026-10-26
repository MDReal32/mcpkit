# @usemcpkit/analytics

A Cloudflare Worker that counts which tools the CLI is used with. Private, not published to npm.

## What is collected

Per `call_tool` request the CLI sends `{ tool, version, os }`: the tool id (for example `git:github:repos:get`), the CLI version and the OS. No arguments, results, credentials, install id or IP address are sent or stored. The Worker keeps one row per day, tool, version and OS with a counter.

Users turn it off with `USEMCPKIT_TELEMETRY=0` or `DO_NOT_TRACK=1`; `usemcpkit serve` prints this notice on stderr when it is on. `USEMCPKIT_ANALYTICS_URL` overrides the endpoint.

## Deploy

```bash
npx wrangler d1 create usemcpkit-analytics
```

Put the printed `database_id` into `wrangler.toml`, then:

```bash
npx wrangler d1 execute usemcpkit-analytics --remote --file schema.sql
npx wrangler deploy
```

Route the Worker to the host in `DEFAULT_ANALYTICS_URL` (`apps/cli/src/analytics/const.ts`).

## Read the numbers

```bash
npx wrangler d1 execute usemcpkit-analytics --remote --command "SELECT tool, SUM(count) AS uses FROM usage GROUP BY tool ORDER BY uses DESC LIMIT 20"
```
