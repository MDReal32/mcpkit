import { defineTool } from "@usemcpkit/core";

export const hierarchyListsCreateListFromTemplateInSpace = defineTool({
  name: "hierarchy:lists:create_list_from_template_in_space",
  description:
    "Create List From Template in Space. Create a new List using a List template within a Space. Publicly shared templates must be added to your Workspace before you can use them with the public API. This request can be run asynchronously or synchronously via the `return_immediately` parameter.",
  input: {
    type: "object",
    properties: {
      space_id: {
        type: "string",
        description: "ID of the Space where the List will be created",
      },
      template_id: {
        type: "string",
        description:
          "ID of the List template to use. Template IDs include a `t-` prefix (e.g., `t-15363293`). Retrieve available template IDs using the Get List Templates endpoint.",
      },
      name: {
        type: "string",
        description: "Name of the new List",
      },
      options: {
        type: "object",
        description: "Options for creating the List",
        properties: {
          return_immediately: {
            type: "boolean",
            description:
              "Flag if newly created Object ID should be returned without waiting for the asset itself and all its nested assets to be applied. If set to true, access checks are performed before returning, but the object might not be fully created yet. In case of a timeout on syncronous requests, the of objects from the template will continue to be created past the timeout.",
            default: true,
          },
          content: {
            type: "string",
            description: "List description",
          },
          time_estimate: {
            type: "number",
            description: "Include time (hours, minutes and seconds)",
          },
          automation: {
            type: "boolean",
            description: "Import automation settings",
          },
          include_views: {
            type: "boolean",
            description: "Import views",
          },
          old_due_date: {
            type: "boolean",
            description: "Import tasks' due dates",
          },
          old_start_date: {
            type: "boolean",
            description: "Import tasks' start dates",
          },
          old_followers: {
            type: "boolean",
            description: "Import tasks' watchers",
          },
          comment_attachments: {
            type: "boolean",
            description: "Import tasks' comment attachments",
          },
          recur_settings: {
            type: "boolean",
            description: "Import tasks' recurring settings",
          },
          old_tags: {
            type: "boolean",
            description: "Import tasks' tags",
          },
          old_statuses: {
            type: "boolean",
            description: "Import tasks' status settings",
          },
          subtasks: {
            type: "boolean",
            description: "Import tasks' subtasks",
          },
          custom_type: {
            type: "boolean",
            description: "Import tasks' task types",
          },
          old_assignees: {
            type: "boolean",
            description: "Import tasks' assignees",
          },
          attachments: {
            type: "boolean",
            description: "Import tasks' attachments",
          },
          comment: {
            type: "boolean",
            description: "Import tasks' comments",
          },
          old_status: {
            type: "boolean",
            description: "Import tasks' current statuses",
          },
          external_dependencies: {
            type: "boolean",
            description: "Import tasks' external dependencies",
          },
          internal_dependencies: {
            type: "boolean",
            description: "Import tasks' internal dependencies",
          },
          priority: {
            type: "boolean",
            description: "Import tasks' priorities",
          },
          custom_fields: {
            type: "boolean",
            description: "Import tasks' Custom Fields",
          },
          old_checklists: {
            type: "boolean",
            description: "Import tasks' checklists",
          },
          relationships: {
            type: "boolean",
            description: "Import tasks' relationships",
          },
          old_subtask_assignees: {
            type: "boolean",
            description: "Import tasks' subtask assignees",
          },
          start_date: {
            type: "string",
            description: "Project start date for remapping dates",
          },
          due_date: {
            type: "string",
            description: "Project due date for remapping dates",
          },
          remap_start_date: {
            type: "boolean",
            description: "Remap start dates",
          },
          skip_weekends: {
            type: "boolean",
            description: "Skip weekends when remapping dates",
          },
          archived: {
            type: "integer",
            description: "Include archived tasks",
            enum: [1, 2],
          },
        },
      },
    },
    required: ["space_id", "template_id", "name"],
  },
  request: {
    method: "POST",
    path: "/v2/space/{space_id}/list_template/{template_id}",
    body: ["name", "options"],
  },
});
