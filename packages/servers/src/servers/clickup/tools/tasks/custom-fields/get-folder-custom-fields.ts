import { defineTool } from "@usemcpkit/core";

export const tasksCustomFieldsGetFolderCustomFields = defineTool({
  name: "tasks:custom_fields:get_folder_custom_fields",
  description:
    "Get Folder Custom Fields. View the Custom Fields you have access to in a Folder. Get Folder Custom Fields only returns Custom Fields created at the Folder level. Custom Fields created at the List level are not included.\\ \\ Custom Fields scoped to specific custom task types include an `applied_objects` array on each field object. Each entry has `object_type` (`19` for custom task type) and `object_id` (the custom task type…",
  input: {
    type: "object",
    properties: {
      folder_id: {
        type: "number",
      },
      include_applied_objects: {
        type: "boolean",
        default: false,
        description: "When `true`, includes `applied_objects` on task-type-scoped Custom Fields in the response.",
      },
    },
    required: ["folder_id"],
  },
  request: {
    method: "GET",
    path: "/v2/folder/{folder_id}/field",
    query: ["include_applied_objects"],
  },
});
