import { defineTool } from "@usemcpkit/core";

export const cloudV1UserGetBulkUserLookup = defineTool({
  name: "cloud_v1:user:get_bulk_user_lookup",
  description:
    "[Cloud v1] Get multiple users using ids. Returns user details for the ids provided in the request. Currently this API returns a maximum of 100 results. If more than 100 account ids are passed in, then the first 100 will be returned.",
  input: {
    type: "object",
    properties: {
      accountId: {
        type: "string",
        description: "A list of accountId's of users to be returned.",
      },
      expand: {
        type: "string",
        description: "A multi-value parameter indicating which properties of the user to expand. (comma-separated)",
      },
    },
    required: ["accountId"],
  },
  request: {
    method: "GET",
    path: "/wiki/rest/api/user/bulk",
    query: ["accountId", "expand"],
    commaQuery: ["expand"],
  },
});
