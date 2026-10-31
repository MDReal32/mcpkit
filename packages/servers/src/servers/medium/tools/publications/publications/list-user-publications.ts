import { defineTool } from "@usemcpkit/core";

export const publicationsPublicationsListUserPublications = defineTool({
  name: "publications:publications:list_user_publications",
  description: "List the publications the user can contribute to (as editor or writer).",
  input: {
    type: "object",
    properties: {
      user_id: {
        type: "string",
        description: "Id of the authenticated user (from account:me:get_me). Other users' ids are refused.",
      },
    },
    required: ["user_id"],
  },
  request: {
    method: "GET",
    path: "/users/{user_id}/publications",
  },
  response: {
    root: "data",
    fields: ["id", "name", "description", "url", "imageUrl"],
  },
});
