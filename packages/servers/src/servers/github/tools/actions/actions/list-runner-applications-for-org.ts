import { defineTool } from "@usemcpkit/core";

export const actionsActionsListRunnerApplicationsForOrg = defineTool({
  name: "actions:actions:list_runner_applications_for_org",
  description:
    "List runner applications for an organization. Lists binaries for the runner application that you can download and run.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
    },
    required: ["org"],
  },
  request: {
    method: "GET",
    path: "/orgs/{org}/actions/runners/downloads",
  },
});
