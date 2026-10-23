import { defineTool } from "@usemcpkit/core";

export const workflowsWorkflowsGetDefaultEditor = defineTool({
  name: "workflows:workflows:get_default_editor",
  description:
    "Get the user's default workflow editor. Get the user's default workflow editor. This can be either the new editor or the legacy editor.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/rest/api/2/workflows/defaultEditor",
  },
});
