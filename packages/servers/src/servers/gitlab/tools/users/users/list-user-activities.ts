import { defineTool } from "@usemcpkit/core";

export const usersUsersListUserActivities = defineTool({
  name: "users:users:list_user_activities",
  description: "List all activity for a user. Lists all activity for a specified user.",
  input: {
    type: "object",
    properties: {
      from: {
        type: "string",
        default: "2024-08-14T17:26:19.883Z",
        description: "Date string in the format YEAR-MONTH-DAY",
      },
      page: {
        type: "integer",
        default: 1,
        description: "Page number of results to retrieve.",
      },
      per_page: {
        type: "integer",
        default: 20,
        description: "Number of items to list per page.",
      },
    },
  },
  request: {
    method: "GET",
    path: "/user/activities",
    query: ["from", "page", "per_page"],
  },
});
