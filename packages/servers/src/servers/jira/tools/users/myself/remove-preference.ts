import { defineTool } from "@usemcpkit/core";

export const usersMyselfRemovePreference = defineTool({
  name: "users:myself:remove_preference",
  description:
    "Delete preference. Deletes a preference of the user, which restores the default value of system defined settings.",
  input: {
    type: "object",
    properties: {
      key: {
        type: "string",
        description: "The key of the preference.",
      },
    },
    required: ["key"],
  },
  request: {
    method: "DELETE",
    path: "/rest/api/2/mypreferences",
    query: ["key"],
  },
});
