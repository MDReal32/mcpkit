import { defineTool } from "@usemcpkit/core";

export const projectsSnippetsCreateSnippets = defineTool({
  name: "projects:snippets:create_snippets",
  description: "Create a snippet. Creates a snippet.",
  input: {
    type: "object",
    properties: {
      title: {
        type: "string",
        description: "Title of the snippet.",
      },
      description: {
        type: "string",
        description: "Description of the snippet.",
      },
      visibility: {
        type: "string",
        description: "Visibility level for the snippet. On GitLab.com, the `internal` value is not available.",
        default: "internal",
        enum: ["private", "internal", "public"],
      },
      files: {
        type: "array",
        description:
          "Array of files for the snippet. Mutually exclusive with `content`. Exactly one of `files`, `content` must be provided.",
        items: {
          type: "object",
          properties: {
            file_path: {
              type: "string",
              description: "Path of the snippet file.",
            },
            content: {
              type: "string",
              description: "Content of the snippet file.",
            },
          },
          required: ["file_path", "content"],
        },
      },
      content: {
        type: "string",
        description:
          "The content of a snippet. Mutually exclusive with `files`. Exactly one of `files`, `content` must be provided.",
      },
      file_name: {
        type: "string",
        description: "The name of a snippet file",
      },
    },
    required: ["title", "file_name"],
  },
  request: {
    method: "POST",
    path: "/snippets",
    body: ["title", "description", "visibility", "files", "content", "file_name"],
  },
});
