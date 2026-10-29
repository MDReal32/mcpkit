import { defineTool } from "@usemcpkit/core";

export const tasksCustomFieldsGetSpaceCustomFields = defineTool({
  name: "tasks:custom_fields:get_space_custom_fields",
  description:
    "Get Space Custom Fields. View the Custom Fields you have access to in a specific Space. Get Space Custom Fields only returns Custom Fields created at the Space level. Custom Fields created at the Folder and List level are not included.\\ \\ Custom Fields scoped to specific custom task types include an `applied_objects` array on each field object. Each entry has `object_type` (`19` for custom task type) and `object_id` (the…",
  input: {
    type: "object",
    properties: {
      space_id: {
        type: "number",
      },
      include_applied_objects: {
        type: "boolean",
        default: false,
        description: "When `true`, includes `applied_objects` on task-type-scoped Custom Fields in the response.",
      },
    },
    required: ["space_id"],
  },
  request: {
    method: "GET",
    path: "/v2/space/{space_id}/field",
    query: ["include_applied_objects"],
  },
});
