# @usemcpkit/ui

Svelte 5 pages the CLI serves on loopback, built into one HTML file (`build/mcpkit.ui.html`) that the CLI imports with
`?raw`. Private. `src/main.ts` mounts the app.

Today that is the credentials form. It renders whatever view model the CLI injects (wording, inputs and buttons come
from the manifest's `ui`), and talks to the server in `@usemcpkit/credentials-form` through the HTTP contract defined
in core (`CREDENTIALS_FORM_API`, the session header).
