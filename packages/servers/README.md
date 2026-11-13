# @usemcpkit/servers

The server definitions usemcpkit ships. Private: the build turns `src/servers` into the JSON registry that CI publishes
to GitHub Pages.

```
src/servers/<name>/<name>.ts          one defineServer export per server
src/servers/<name>/const.ts           its host, headers, auth and OpenAPI sources
src/servers/<name>/tools/<tool>.ts    hand-written tools, one per file
src/servers/<name>/openapi.json       a description written by hand, for a vendor that publishes none
plugins/manifests/                    Vite plugin: compiles and validates src/servers, writes build/manifests
```

`yarn build` (in this package) compiles every server into `build/manifests/`: `index.json` plus
`<category>/<server>.json`. An invalid definition fails the build. A server with `openapi` sources ships no tools of its
own beyond the hand-written ones: the CLI builds them from the source's description for the host and version in use
(README "Servers built from OpenAPI"). A source url without a scheme names a document of the server's folder, which the
build publishes as `<category>/<server>/<file>` and pins by its sha256. A server whose tools are all named
`<group>:<resource>:<action>` is written as a shell (the manifest without tools, listing its parts with checksums) plus
one `<category>/<server>/<group>.json` per group; the CLI downloads only the group a tool belongs to.
`src/main.ts` only exports `DEFAULT_REGISTRY_URL`.

## Adding a server

Create `src/servers/<name>/<name>.ts` with exactly one named export built with `defineServer` from `@usemcpkit/core`.
Folder dashes become underscores in the server name (`my-api` → `my_api`). For a REST API with an OpenAPI description,
list it in `openapi.sources`; pin a url without `{version}` to an immutable address (a commit, a package version) and
its `sha256`, and give a self-hosted product a `version` probe and a `known` table or `list` of published versions. A
built tool that is wrong for some versions is replaced by a hand-written tool of the same name with `applies`.
Servers that live in a category folder (`servers/<category>/<name>`) are found the same way.
