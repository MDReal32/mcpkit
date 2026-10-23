import { defineTool } from "@usemcpkit/core";

export const ciCiMinutesUpdateNamespacesMinutesMove = defineTool({
  name: "ci:ci_minutes:update_namespaces_minutes_move",
  description: "[Deprecated] Transfer purchased compute minutes packs to another namespace. Deprecated in GitLab 17.7",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID of the namespace to transfer from.",
      },
      target_id: {
        type: "string",
        description: "ID of the namespace for the packs to transfer to.",
      },
    },
    required: ["id", "target_id"],
  },
  request: {
    method: "PATCH",
    path: "/namespaces/{id}/minutes/move/{target_id}",
  },
});
