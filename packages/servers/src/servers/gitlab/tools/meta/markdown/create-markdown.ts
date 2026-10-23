import { defineTool } from "@usemcpkit/core";

export const metaMarkdownCreateMarkdown = defineTool({
  name: "meta:markdown:create_markdown",
  description: "Render Markdown content. Renders Markdown content as HTML.",
  input: {
    type: "object",
    properties: {
      text: {
        type: "string",
        description: "Markdown text to render.",
      },
      gfm: {
        type: "boolean",
        description: "Render text using GitLab Flavored Markdown.",
        default: false,
      },
      project: {
        type: "string",
        description: "Project used as context when creating references with GitLab Flavored Markdown.",
      },
    },
    required: ["text"],
  },
  request: {
    method: "POST",
    path: "/markdown",
    body: ["text", "gfm", "project"],
  },
});
