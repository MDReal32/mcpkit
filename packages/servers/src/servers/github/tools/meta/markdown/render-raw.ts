import { defineTool } from "@usemcpkit/core";

export const metaMarkdownRenderRaw = defineTool({
  name: "meta:markdown:render_raw",
  description:
    "Render a Markdown document in raw mode. You must send Markdown as plain text (using a `Content-Type` header of `text/plain` or `text/x-markdown`) to this endpoint, rather than using JSON format. In raw mode, GitHub Flavored Markdown is not supported and Markdown will be rendered in plain format like a README.md file. Markdown content must be 400 KB or less.",
  input: {
    type: "object",
    properties: {
      body: {
        type: "string",
      },
    },
  },
  request: {
    method: "POST",
    path: "/markdown/raw",
    bodyArg: "body",
    contentType: "text/plain",
  },
});
