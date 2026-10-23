import { defineTool } from "@usemcpkit/core";

export const metaGitignoreGetTemplate = defineTool({
  name: "meta:gitignore:get_template",
  description: "Get a gitignore template. Get the content of a gitignore template.",
  input: {
    type: "object",
    properties: {
      name: {
        type: "string",
      },
    },
    required: ["name"],
  },
  request: {
    method: "GET",
    path: "/gitignore/templates/{name}",
  },
});
