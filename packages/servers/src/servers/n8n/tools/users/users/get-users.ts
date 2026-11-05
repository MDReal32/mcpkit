import { defineTool } from "@usemcpkit/core";

export const usersUsersGetUsers = defineTool({
  name: "users:users:get_users",
  description: "Retrieve all users. Retrieve all users from your instance. Only available for the instance owner.",
  input: {
    type: "object",
    properties: {
      limit: {
        type: "number",
        default: 100,
        description: "The maximum number of items to return.",
      },
      cursor: {
        type: "string",
        description:
          'Paginate by setting the cursor parameter to the nextCursor attribute returned by the previous request\'s response. Default value fetches the first "page" of the collection. See pagination for more detail.',
      },
      includeRole: {
        type: "string",
        default: "false",
        enum: ["true", "false"],
      },
      projectId: {
        type: "string",
      },
    },
  },
  request: {
    method: "GET",
    path: "/users",
    query: ["limit", "cursor", "includeRole", "projectId"],
  },
});
