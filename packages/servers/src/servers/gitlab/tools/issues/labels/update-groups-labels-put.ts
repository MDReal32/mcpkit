import { defineTool } from "@usemcpkit/core";

export const issuesLabelsUpdateGroupsLabelsPut = defineTool({
  name: "issues:labels:update_groups_labels_put",
  description:
    "Update a group label. Updates a specified group label. At least one parameter is required to update the group label.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      name: {
        type: "string",
        description: "Name or ID of the label to update.",
      },
      new_name: {
        type: "string",
        description:
          "The new name of the label. At least one of `new_name`, `color`, `description`, `archived` must be provided.",
      },
      color: {
        type: "string",
        description:
          "New color of the label, given in 6-digit hex notation with a leading `#` sign (for example, `#FFAABB`), or one of the CSS color names. At least one of `new_name`, `color`, `description`, `archived` must be provided.",
      },
      description: {
        type: "string",
        description:
          "New description of label. At least one of `new_name`, `color`, `description`, `archived` must be provided.",
      },
      archived: {
        type: "boolean",
        description:
          "Whether the label is archived. At least one of `new_name`, `color`, `description`, `archived` must be provided.",
      },
    },
    required: ["id", "name"],
  },
  request: {
    method: "PUT",
    path: "/groups/{id}/labels/{name}",
    body: ["new_name", "color", "description", "archived"],
  },
});
