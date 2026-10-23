import { defineTool } from "@usemcpkit/core";

export const copilotCopilotSetCopilotContentExclusionForOrganization = defineTool({
  name: "copilot:copilot:set_copilot_content_exclusion_for_organization",
  description:
    "Set Copilot content exclusion rules for an organization. > [!NOTE] > This endpoint is in public preview and is subject to change.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      body: {
        type: "object",
      },
    },
    required: ["org", "body"],
  },
  request: {
    method: "PUT",
    path: "/orgs/{org}/copilot/content_exclusion",
    bodyArg: "body",
  },
});
