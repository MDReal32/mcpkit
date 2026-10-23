import { defineTool } from "@usemcpkit/core";

export const actionsActionsRemoveCustomLabelFromSelfHostedRunnerForOrg = defineTool({
  name: "actions:actions:remove_custom_label_from_self_hosted_runner_for_org",
  description:
    "Remove a custom label from a self-hosted runner for an organization. Remove a custom label from a self-hosted runner configured in an organization. Returns the remaining labels from the runner.",
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
      name: {
        type: "string",
        description: "The name of a self-hosted runner's custom label.",
      },
    },
    required: ["org", "runner_id", "name"],
  },
  request: {
    method: "DELETE",
    path: "/orgs/{org}/actions/runners/{runner_id}/labels/{name}",
  },
});
