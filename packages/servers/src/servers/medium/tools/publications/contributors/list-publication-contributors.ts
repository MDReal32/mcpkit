import { defineTool } from "@usemcpkit/core";

export const publicationsContributorsListPublicationContributors = defineTool({
  name: "publications:contributors:list_publication_contributors",
  description: "List the contributors of a publication with their role, `editor` or `writer`.",
  input: {
    type: "object",
    properties: {
      publication_id: {
        type: "string",
        description: "Publication id (from publications:publications:list_user_publications).",
      },
    },
    required: ["publication_id"],
  },
  request: {
    method: "GET",
    path: "/publications/{publication_id}/contributors",
  },
  response: {
    root: "data",
    fields: ["publicationId", "userId", "role"],
  },
});
