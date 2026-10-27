import { defineTool } from "@usemcpkit/core";

export const tasksCustomFieldsGetListCustomFields = defineTool({
  name: "tasks:custom_fields:get_list_custom_fields",
  description:
    "Get List Custom Fields. View the Custom Fields you have access to in a specific List.\\ \\ Custom Fields scoped to specific custom task types include an `applied_objects` array on each field object. Each entry has `object_type` (`19` for custom task type) and `object_id` (the custom task type ID, matching `custom_item_id` on tasks). Use Get Custom Task Types to resolve IDs to names. Fields without task-type scoping omit `…",
  input: {
    type: "object",
    properties: {
      list_id: {
        type: "number",
      },
      include_applied_objects: {
        type: "boolean",
        default: false,
        description: "When `true`, includes `applied_objects` on task-type-scoped Custom Fields in the response.",
      },
    },
    required: ["list_id"],
  },
  request: {
    method: "GET",
    path: "/v2/list/{list_id}/field",
    query: ["include_applied_objects"],
  },
});
