import { defineTool } from "@usemcpkit/core";

export const copilotAgentsUpdateOrgVariable = defineTool({
  name: "copilot:agents:update_org_variable",
  description:
    "Update an organization variable. Updates an organization agent variable that you can reference in a GitHub Actions workflow.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      name: {
        type: "string",
        description: "The name of the variable.",
      },
      body_name: {
        type: "string",
        description: "The name of the variable.",
      },
      value: {
        type: "string",
        description: "The value of the variable.",
      },
      visibility: {
        type: "string",
        description:
          "The type of repositories in the organization that can access the variable. `selected` means only the repositories specified by `selected_repository_ids` can access the variable.",
        enum: ["all", "private", "selected"],
      },
      selected_repository_ids: {
        type: "array",
        description:
          "An array of repository ids that can access the organization variable. You can only provide a list of repository ids when the `visibility` is set to `selected`.",
        items: {
          type: "integer",
        },
      },
    },
    required: ["org", "name"],
  },
  request: {
    method: "PATCH",
    path: "/orgs/{org}/agents/variables/{name}",
    body: {
      name: "body_name",
      value: "value",
      visibility: "visibility",
      selected_repository_ids: "selected_repository_ids",
    },
  },
});
