import { defineTool } from "@usemcpkit/core";

export const copilotCopilotSpacesGetResourceForOrg = defineTool({
  name: "copilot:copilot_spaces:get_resource_for_org",
  description:
    "Get a resource for an organization Copilot Space. Gets a specific resource attached to a Copilot Space owned by an organization. The authenticated user must have appropriate permissions to view the space.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      space_number: {
        type: "integer",
        description: "The unique identifier of the Copilot Space.",
      },
      space_resource_id: {
        type: "integer",
        description: "The unique identifier of the resource.",
      },
    },
    required: ["org", "space_number", "space_resource_id"],
  },
  request: {
    method: "GET",
    path: "/orgs/{org}/copilot-spaces/{space_number}/resources/{space_resource_id}",
  },
});
