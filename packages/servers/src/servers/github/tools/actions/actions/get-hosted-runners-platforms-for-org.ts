import { defineTool } from "@usemcpkit/core";

export const actionsActionsGetHostedRunnersPlatformsForOrg = defineTool({
  name: "actions:actions:get_hosted_runners_platforms_for_org",
  description:
    "Get platforms for GitHub-hosted runners in an organization. Get the list of platforms available for GitHub-hosted runners for an organization.",
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
    path: "/orgs/{org}/actions/hosted-runners/platforms",
  },
});
