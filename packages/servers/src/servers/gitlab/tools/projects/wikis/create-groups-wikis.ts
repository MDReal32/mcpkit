import { defineTool } from "@usemcpkit/core";

export const projectsWikisCreateGroupsWikis = defineTool({
  name: "projects:wikis:create_groups_wikis",
  description:
    "Create a wiki page for a group. Creates a wiki page for a specified group. Requests can define the title, slug, and content.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group or project.",
      },
      title: {
        type: "string",
        description: "Title of the wiki page.",
      },
      front_matter: {
        type: "object",
        description: "YAML front matter of the wiki page.",
        properties: {
          title: {
            type: "string",
            description: "Title in the front matter of the wiki page.",
          },
        },
      },
      content: {
        type: "string",
        description: "Content of the wiki page.",
      },
      format: {
        type: "string",
        description: "Format of the wiki page.",
        default: "markdown",
        enum: ["markdown", "rdoc", "asciidoc", "org"],
      },
    },
    required: ["id", "title", "content"],
  },
  request: {
    method: "POST",
    path: "/groups/{id}/wikis",
    body: ["title", "front_matter", "content", "format"],
  },
});
