import { defineTool } from "@usemcpkit/core";

export const cloudV1ContentGetContentRestrictionStatusForUser = defineTool({
  name: "cloud_v1:content:get_content_restriction_status_for_user",
  description:
    "[Cloud v1] Get content restriction status for user. Returns whether the specified content restriction applies to a user. For example, if a page with `id=123` has a `read` restriction for a user with an account ID of `384093:32b4d9w0-f6a5-3535-11a3-9c8c88d10192`, the following request will return `true`:",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The ID of the content that the restriction applies to.",
      },
      operationKey: {
        type: "string",
        description: "The operation that is restricted.",
      },
      key: {
        type: "string",
        description:
          "This parameter is no longer available and will be removed from the documentation soon. Use `accountId` instead. See the deprecation notice for details.",
      },
      username: {
        type: "string",
        description:
          "This parameter is no longer available and will be removed from the documentation soon. Use `accountId` instead. See the deprecation notice for details.",
      },
      accountId: {
        type: "string",
        description:
          "The account ID of the user. The accountId uniquely identifies the user across all Atlassian products. For example, `384093:32b4d9w0-f6a5-3535-11a3-9c8c88d10192`.",
      },
    },
    required: ["id", "operationKey"],
  },
  request: {
    method: "GET",
    path: "/wiki/rest/api/content/{id}/restriction/byOperation/{operationKey}/user",
    query: ["key", "username", "accountId"],
  },
});
