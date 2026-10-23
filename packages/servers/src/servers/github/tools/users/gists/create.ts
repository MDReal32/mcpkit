import { defineTool } from "@usemcpkit/core";

export const usersGistsCreate = defineTool({
  name: "users:gists:create",
  description: "Create a gist. Allows you to add a new gist with one or more files.",
  input: {
    type: "object",
    properties: {
      description: {
        type: "string",
        description: "Description of the gist",
      },
      files: {
        type: "object",
        description: "Names and content for the files that make up the gist",
      },
      public: {},
    },
    required: ["files"],
  },
  request: {
    method: "POST",
    path: "/gists",
    body: ["description", "files", "public"],
  },
});
