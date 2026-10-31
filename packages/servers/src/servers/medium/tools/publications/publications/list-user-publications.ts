import { defineTool } from "@usemcpkit/core";

export const publicationsPublicationsListUserPublications = defineTool({
  name: "publications:publications:list_user_publications",
  description:
    "List the publications a user can contribute to (as editor or writer). Only the authenticated user's id is accepted.",
  input: {
    type: "object",
    properties: {
      userId: {
        type: "string",
        description: "Id of the authenticated user (from account:me:get_me).",
      },
    },
    required: ["userId"],
  },
  request: {
    method: "GET",
    path: "/users/{userId}/publications",
  },
  response: {
    root: "data",
    fields: ["id", "name", "description", "url", "imageUrl"],
  },
});
