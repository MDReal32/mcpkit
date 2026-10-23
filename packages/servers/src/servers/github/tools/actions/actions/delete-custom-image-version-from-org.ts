import { defineTool } from "@usemcpkit/core";

export const actionsActionsDeleteCustomImageVersionFromOrg = defineTool({
  name: "actions:actions:delete_custom_image_version_from_org",
  description:
    "Delete an image version of custom image from the organization. Delete an image version of custom image from the organization.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      image_definition_id: {
        type: "integer",
        description: "Image definition ID of custom image",
      },
      version: {
        type: "string",
        description: "Version of a custom image",
      },
    },
    required: ["org", "image_definition_id", "version"],
  },
  request: {
    method: "DELETE",
    path: "/orgs/{org}/actions/hosted-runners/images/custom/{image_definition_id}/versions/{version}",
  },
});
