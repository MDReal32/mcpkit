# @usemcpkit/analytics

A Cloudflare Worker that counts which tools the CLI is used with. Private, not published to npm.

## What is collected

Per `call_tool` request the CLI sends `{ tool, version, os }`: the tool id (for example `git:github:repos:get`), the CLI version and the OS. No arguments, results, credentials, install id or IP address are sent or stored. The Worker keeps one row per day, tool, version and OS with a counter.

Users turn it off with `USEMCPKIT_TELEMETRY=0` or `DO_NOT_TRACK=1`; `usemcpkit serve` prints this notice on stderr when it is on. `USEMCPKIT_ANALYTICS_URL` overrides the endpoint.

## Deploy

Run once, after `yarn workspace @usemcpkit/analytics exec wrangler login`:

```bash
yarn nx run @usemcpkit/analytics:init
```

Put the printed `database_id` into `wrangler.toml`, then:

```bash
yarn nx run @usemcpkit/analytics:db:schema
yarn nx run @usemcpkit/analytics:deploy
```

Route the Worker to the host in `DEFAULT_ANALYTICS_URL` (`apps/cli/src/analytics/const.ts`). With Cloudflare's git integration leave the build command empty and use `npx wrangler deploy --config apps/analytics/wrangler.toml` as the deploy command.

## Read the numbers

```bash
yarn nx run @usemcpkit/analytics:db:top
```
