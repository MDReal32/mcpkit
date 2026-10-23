import { defineTool } from "@usemcpkit/core";

export const appsCodespacesGetExportDetailsForAuthenticatedUser = defineTool({
  name: "apps:codespaces:get_export_details_for_authenticated_user",
  description: "Get details about a codespace export. Gets information about an export of a codespace.",
  input: {
    type: "object",
    properties: {
      codespace_name: {
        type: "string",
        description: "The name of the codespace.",
      },
      export_id: {
        type: "string",
        description: "The ID of the export operation, or `latest`. Currently only `latest` is currently supported.",
      },
    },
    required: ["codespace_name", "export_id"],
  },
  request: {
    method: "GET",
    path: "/user/codespaces/{codespace_name}/exports/{export_id}",
  },
});
