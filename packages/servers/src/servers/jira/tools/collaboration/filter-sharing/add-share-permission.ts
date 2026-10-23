import { defineTool } from "@usemcpkit/core";

export const collaborationFilterSharingAddSharePermission = defineTool({
  name: "collaboration:filter_sharing:add_share_permission",
  description:
    "Add share permission. Add a share permissions to a filter. If you add a global share permission (one for all logged-in users or the public) it will overwrite all share permissions for the filter.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the filter.",
      },
      accountId: {
        type: "string",
        description:
          "The user account ID that the filter is shared with. For a request, specify the `accountId` property for the user.",
      },
      groupId: {
        type: "string",
        description:
          "The ID of the group, which uniquely identifies the group across all Atlassian products.For example, *952d12c3-5b5b-4d04-bb32-44d383afc4b2*. Cannot be provided with `groupname`.",
      },
      groupname: {
        type: "string",
        description:
          "The name of the group to share the filter with. Set `type` to `group`. Please note that the name of a group is mutable, to reliably identify a group use `groupId`.",
      },
      projectId: {
        type: "string",
        description: "The ID of the project to share the filter with. Set `type` to `project`.",
      },
      projectRoleId: {
        type: "string",
        description:
          "The ID of the project role to share the filter with. Set `type` to `projectRole` and the `projectId` for the project that the role is in.",
      },
      rights: {
        type: "integer",
        description: "The rights for the share permission.",
      },
      type: {
        type: "string",
        description: "The type of the share permission.Specify the type as follows:",
        enum: ["user", "project", "group", "projectRole", "global", "authenticated"],
      },
    },
    required: ["id", "type"],
  },
  request: {
    method: "POST",
    path: "/rest/api/2/filter/{id}/permission",
    body: ["accountId", "groupId", "groupname", "projectId", "projectRoleId", "rights", "type"],
  },
});
