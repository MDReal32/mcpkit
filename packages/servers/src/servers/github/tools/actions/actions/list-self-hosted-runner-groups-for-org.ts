import { defineTool } from "@usemcpkit/core";

export const actionsActionsListSelfHostedRunnerGroupsForOrg = defineTool({
  name: "actions:actions:list_self_hosted_runner_groups_for_org",
  description:
    "List self-hosted runner groups for an organization. Lists all self-hosted runner groups configured in an organization and inherited from an enterprise.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      per_page: {
        type: "integer",
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
      page: {
        type: "integer",
        default: 1,
        description:
          'The page number of the results to fetch. For more information, see "Using pagination in the REST API."',
      },
      visible_to_repository: {
        type: "string",
        description: "Only return runner groups that are allowed to be used by this repository.",
      },
    },
    required: ["org"],
  },
  request: {
    method: "GET",
    path: "/orgs/{org}/actions/runner-groups",
    query: ["per_page", "page", "visible_to_repository"],
  },
});
