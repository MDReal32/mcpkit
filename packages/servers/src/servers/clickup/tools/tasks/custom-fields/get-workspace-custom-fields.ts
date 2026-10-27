import { defineTool } from "@usemcpkit/core";

export const tasksCustomFieldsGetWorkspaceCustomFields = defineTool({
  name: "tasks:custom_fields:get_workspace_custom_fields",
  description:
    "Get Workspace Custom Fields. View the Custom Fields you have access to in a specific Workspace. Get Workspace Custom Fields only returns Custom Fields created at the Workspace level. Custom Fields created at the Space, Folder, and List level are not included.\\ \\ Custom Fields scoped to specific custom task types include an `applied_objects` array on each field object. Each entry has `object_type` (`19` for custom task type)…",
  input: {
    type: "object",
    properties: {
      team_id: {
        type: "number",
        description: "Workspace ID",
      },
      include_applied_objects: {
        type: "boolean",
        default: false,
        description: "When `true`, includes `applied_objects` on task-type-scoped Custom Fields in the response.",
      },
    },
    required: ["team_id"],
  },
  request: {
    method: "GET",
    path: "/v2/team/{team_id}/field",
    query: ["include_applied_objects"],
  },
});
