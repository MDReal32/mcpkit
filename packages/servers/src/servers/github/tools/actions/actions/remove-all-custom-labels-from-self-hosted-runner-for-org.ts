import { defineTool } from "@usemcpkit/core";

export const actionsActionsRemoveAllCustomLabelsFromSelfHostedRunnerForOrg = defineTool({
  name: "actions:actions:remove_all_custom_labels_from_self_hosted_runner_for_org",
  description:
    "Remove all custom labels from a self-hosted runner for an organization. Remove all custom labels from a self-hosted runner configured in an organization. Returns the remaining read-only labels from the runner.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      runner_id: {
        type: "integer",
        description: "Unique identifier of the self-hosted runner.",
      },
    },
    required: ["org", "runner_id"],
  },
  request: {
    method: "DELETE",
    path: "/orgs/{org}/actions/runners/{runner_id}/labels",
  },
});
