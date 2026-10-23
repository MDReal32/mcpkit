import { defineTool } from "@usemcpkit/core";

export const issuesLabelsCreateProjectsLabels = defineTool({
  name: "issues:labels:create_projects_labels",
  description: "Create a project label. Creates a label for a specified project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      name: {
        type: "string",
        description: "The name of the label to be created",
      },
      color: {
        type: "string",
        description:
          "Color of the label in 6-digit hex notation with a leading `#` sign, for example `#FFAABB`, or one of the CSS color names.",
      },
      description: {
        type: "string",
        description: "Description of the label.",
      },
      archived: {
        type: "boolean",
        description: "Whether the label is archived",
      },
      priority: {
        type: "integer",
        description: "The priority of the label",
      },
    },
    required: ["id", "name", "color"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/labels",
    body: ["name", "color", "description", "archived", "priority"],
  },
});
