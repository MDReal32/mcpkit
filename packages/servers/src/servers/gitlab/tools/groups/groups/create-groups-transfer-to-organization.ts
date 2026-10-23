import { defineTool } from "@usemcpkit/core";

export const groupsGroupsCreateGroupsTransferToOrganization = defineTool({
  name: "groups:groups:create_groups_transfer_to_organization",
  description:
    "Transfer a group to an organization. Transfers a group to another organization asynchronously. Requires the Owner role.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      organization_id: {
        type: "integer",
        description: "ID of the organization to transfer the group to.",
      },
    },
    required: ["id", "organization_id"],
  },
  request: {
    method: "POST",
    path: "/groups/{id}/transfer_to_organization",
    body: ["organization_id"],
  },
});
