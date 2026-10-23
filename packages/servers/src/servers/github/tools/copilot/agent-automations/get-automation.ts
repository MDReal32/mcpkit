import { defineTool } from "@usemcpkit/core";

export const copilotAgentAutomationsGetAutomation = defineTool({
  name: "copilot:agent_automations:get_automation",
  description:
    "Get an automation by ID. Returns an automation by ID without requiring repository context when its `created_by` user is the authenticated caller and the caller can read its repository. This includes both user-owned and repository-owned automations created by the caller but excludes repository-owned automations created by someone else even if the caller has write access to the repository.",
  input: {
    type: "object",
    properties: {
      automation_id: {
        type: "string",
        description: "The unique identifier of the automation.",
      },
    },
    required: ["automation_id"],
  },
  request: {
    method: "GET",
    path: "/agents/automations/{automation_id}",
  },
});
