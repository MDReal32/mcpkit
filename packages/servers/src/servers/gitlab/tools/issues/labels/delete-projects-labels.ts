import { defineTool } from "@usemcpkit/core";

export const issuesLabelsDeleteProjectsLabels = defineTool({
  name: "issues:labels:delete_projects_labels",
  description:
    "[Deprecated] Delete an existing label. Deprecated in GitLab 12.4. Use DELETE /projects/:id/labels/:name instead.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      label_id: {
        type: "integer",
        description: "ID of the label to delete. Exactly one of `label_id`, `name` must be provided.",
      },
      name: {
        type: "string",
        description: "Name of the label to delete. Exactly one of `label_id`, `name` must be provided.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "DELETE",
    path: "/projects/{id}/labels",
    query: ["label_id", "name"],
  },
});
