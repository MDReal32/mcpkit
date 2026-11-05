import { defineTool } from "@usemcpkit/core";

export const instancePromotionsGetPromotionChanges = defineTool({
  name: "instance:promotions:get_promotion_changes",
  description:
    "List the changes of a project in one direction. Compares a team project on this instance with the branch of its promotion environment for that direction and lists the workflows that differ. For `promote` the rows are what a promotion sends to the branch, and the key needs the gitConnection:push scope. A `deleted` or `new` promote row can be a workflow that moved between projects; promoting it is refused until it moves back. For `apply` the row…",
  input: {
    type: "object",
    properties: {
      projectId: {
        type: "string",
        description: "The ID of the project.",
      },
      direction: {
        type: "string",
        enum: ["apply", "promote"],
        description: "The direction of the promotion: apply or promote.",
      },
      search: {
        type: "string",
      },
      sort: {
        type: "string",
        default: "name",
        enum: ["name", "updatedAt", "status"],
      },
      order: {
        type: "string",
        default: "asc",
        enum: ["asc", "desc"],
      },
    },
    required: ["projectId", "direction"],
  },
  request: {
    method: "GET",
    path: "/promotions/projects/{projectId}/changes/{direction}",
    query: ["search", "sort", "order"],
  },
});
