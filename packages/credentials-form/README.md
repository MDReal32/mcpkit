# @usemcpkit/credentials-form

Serves the one-off local credentials page the CLI opens when a tool call has no working credentials. Private; bundled
into the CLI.

`createCredentialsForm` starts a server on `127.0.0.1` (a free port) and returns its URL. Only the page that was
opened can answer: the URL carries a session token in its `#fragment`, and the server checks it and the `Host`
header. Concurrent calls share one form; it closes after an answer, on Cancel, or after 5 minutes.

- `inject-credential-request.ts`: puts the view model (`buildCredentialRequest` from core, built from the manifest's
  `ui`) into the page as JSON. The page has no text of its own.
- `server/`, `submit-answer.ts`: the HTTP side (`CREDENTIALS_FORM_API` and the session header come from core).
- `cli-detection/`, `token-import/`: offering a `cli` action only when its program is on PATH, and running it on click
  without a shell (15 s timeout); the token it prints goes straight to the API check and never reaches the browser.

The page itself is `packages/ui`.
