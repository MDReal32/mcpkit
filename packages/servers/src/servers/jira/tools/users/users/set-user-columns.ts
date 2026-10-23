import { defineTool } from "@usemcpkit/core";

export const usersUsersSetUserColumns = defineTool({
  name: "users:users:set_user_columns",
  description:
    "Set user default columns. Sets the default issue table columns for the user. If an account ID is not passed, the calling user's default columns are set. If no column details are sent, then all default columns are removed.",
  input: {
    type: "object",
    properties: {
      accountId: {
        type: "string",
        description:
          "The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*.",
      },
      columns: {
        type: "array",
        items: {
          type: "string",
        },
      },
    },
  },
  request: {
    method: "PUT",
    path: "/rest/api/2/user/columns",
    query: ["accountId"],
    body: ["columns"],
    contentType: "multipart/form-data",
  },
});
