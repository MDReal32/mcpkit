import { defineTool } from "@usemcpkit/core";

export const usersActivityListEventsForAuthenticatedUser = defineTool({
  name: "users:activity:list_events_for_authenticated_user",
  description:
    'List events for the authenticated user. If you are authenticated as the given user, you will see your private events. Otherwise, you\'ll only see public events. _Optional_: use the fine-grained token with following permission set to view private events: "Events" user permissions (read).',
  input: {
    type: "object",
    properties: {
      username: {
        type: "string",
        description: "The handle for the GitHub user account.",
      },
      per_page: {
        type: "integer",
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
      page: {
        type: "integer",
        default: 1,
        description:
          'The page number of the results to fetch. For more information, see "Using pagination in the REST API."',
      },
    },
    required: ["username"],
  },
  request: {
    method: "GET",
    path: "/users/{username}/events",
    query: ["per_page", "page"],
  },
});
