import { defineTool } from "@usemcpkit/core";

export const actionsActionsGetCustomImageForOrg = defineTool({
  name: "actions:actions:get_custom_image_for_org",
  description:
    "Get a custom image definition for GitHub Actions Hosted Runners. Get a custom image definition for GitHub Actions Hosted Runners.",
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
    },
    required: ["org", "image_definition_id"],
  },
  request: {
    method: "GET",
    path: "/orgs/{org}/actions/hosted-runners/images/custom/{image_definition_id}",
  },
});
