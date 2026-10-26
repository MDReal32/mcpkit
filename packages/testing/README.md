# @usemcpkit/testing

Test fixtures shared across the workspaces. Private, shipped as source (`exports` points at `src/main.ts`).

- `createPingManifest`: a small valid manifest.
- `createFakeFetch`: a `fetch` replacement that serves canned responses and records requests.
- `useTempDir`: a temporary directory per test, removed afterwards.
