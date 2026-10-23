import { defineTool } from "@usemcpkit/core";

export const appsCodespacesExportForAuthenticatedUser = defineTool({
  name: "apps:codespaces:export_for_authenticated_user",
  description:
    "Export a codespace for the authenticated user. Triggers an export of the specified codespace and returns a URL and ID where the status of the export can be monitored.",
  input: {
    type: "object",
    properties: {
      codespace_name: {
        type: "string",
        description: "The name of the codespace.",
      },
    },
    required: ["codespace_name"],
  },
  request: {
    method: "POST",
    path: "/user/codespaces/{codespace_name}/exports",
  },
});
