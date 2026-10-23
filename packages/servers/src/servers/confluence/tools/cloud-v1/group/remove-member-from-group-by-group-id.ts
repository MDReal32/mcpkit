import { defineTool } from "@usemcpkit/core";

export const cloudV1GroupRemoveMemberFromGroupByGroupId = defineTool({
  name: "cloud_v1:group:remove_member_from_group_by_group_id",
  description: "[Cloud v1] Remove member from group using group id. Remove user as a member from a group.",
  input: {
    type: "object",
    properties: {
      groupId: {
        type: "string",
        description: "Id of the group whose membership is updated.",
      },
      accountId: {
        type: "string",
        description:
          "The account ID of the user. The accountId uniquely identifies the user across all Atlassian products. For example, `384093:32b4d9w0-f6a5-3535-11a3-9c8c88d10192`.",
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
    },
    required: ["groupId", "accountId"],
  },
  request: {
    method: "DELETE",
    path: "/wiki/rest/api/group/userByGroupId",
    query: ["groupId", "accountId", "key", "username"],
  },
});
