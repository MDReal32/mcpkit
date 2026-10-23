import { defineTool } from "@usemcpkit/core";

export const securityDependencyManagementCreateGroupsDependencyListExports = defineTool({
  name: "security:dependency_management:create_groups_dependency_list_exports",
  description:
    "Create a dependency list export. Creates a CycloneDX JSON export for all the project dependencies detected in a pipeline. If an authenticated user does not have the read_dependency permission, this request returns a `403 Forbidden` status code.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      send_email: {
        type: "boolean",
        description: "If `true`, sends an email notification to the requesting user when the export completes.",
        default: false,
      },
      export_type: {
        type: "string",
        description: "Format of the export.",
        default: "json_array",
        enum: ["json_array", "csv"],
      },
    },
    required: ["id"],
  },
  request: {
    method: "POST",
    path: "/groups/{id}/dependency_list_exports",
    body: ["send_email", "export_type"],
  },
});
