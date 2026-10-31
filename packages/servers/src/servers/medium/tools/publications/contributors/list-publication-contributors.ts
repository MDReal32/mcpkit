import { defineTool } from "@usemcpkit/core";

export const publicationsContributorsListPublicationContributors = defineTool({
  name: "publications:contributors:list_publication_contributors",
  description:
    "List a publication's contributors with their role, `editor` or `writer`. Take the publication id from publications:publications:list_user_publications.",
  input: {
    type: "object",
    properties: {
      publicationId: {
        type: "string",
        description: "Publication id (from publications:publications:list_user_publications).",
      },
    },
    required: ["publicationId"],
  },
  request: {
    method: "GET",
    path: "/publications/{publicationId}/contributors",
  },
  response: {
    root: "data",
    fields: ["publicationId", "userId", "role"],
  },
});
