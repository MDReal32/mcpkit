import { defineTool } from "@usemcpkit/core";

export const hierarchyListsDeleteList = defineTool({
  name: "hierarchy:lists:delete_list",
  description: "Delete List. Delete a List from your Workspace.",
  input: {
    type: "object",
    properties: {
      list_id: {
        type: "number",
      },
    },
    required: ["list_id"],
  },
  request: {
    method: "DELETE",
    path: "/v2/list/{list_id}",
  },
});
