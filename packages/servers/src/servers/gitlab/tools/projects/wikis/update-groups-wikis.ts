import { defineTool } from "@usemcpkit/core";

export const projectsWikisUpdateGroupsWikis = defineTool({
  name: "projects:wikis:update_groups_wikis",
  description: "Update a wiki page for a group. Updates a specified wiki page for a group.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group or project.",
      },
      slug: {
        type: "string",
        description: "URL-encoded slug of the wiki page, a unique string such as `dir%2Fpage_name`.",
      },
      title: {
        type: "string",
        description: "Title of the wiki page. At least one of `content`, `title`, `format` must be provided.",
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
        description: "Content of the wiki page. At least one of `content`, `title`, `format` must be provided.",
      },
      format: {
        type: "string",
        description: "Format of the wiki page. At least one of `content`, `title`, `format` must be provided.",
        default: "markdown",
        enum: ["markdown", "rdoc", "asciidoc", "org"],
      },
    },
    required: ["id", "slug"],
  },
  request: {
    method: "PUT",
    path: "/groups/{id}/wikis/{slug}",
    body: ["title", "front_matter", "content", "format"],
  },
});
