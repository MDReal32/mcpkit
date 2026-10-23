import { defineTool } from "@usemcpkit/core";

export const issuesProjectsCreateViewForUser = defineTool({
  name: "issues:projects:create_view_for_user",
  description:
    "Create a view for a user-owned project. Create a new view in a user-owned project. Views allow you to customize how items in a project are displayed and filtered.",
  input: {
    type: "object",
    properties: {
      user_id: {
        type: "string",
        description: "The unique identifier of the user.",
      },
      project_number: {
        type: "integer",
        description: "The project's number.",
      },
      name: {
        type: "string",
        description: "The name of the view.",
      },
      layout: {
        type: "string",
        description: "The layout of the view.",
        enum: ["table", "board", "roadmap"],
      },
      filter: {
        type: "string",
        description: "The filter query for the view. See Filtering projects for more information.",
      },
      visible_fields: {
        type: "array",
        description:
          "`visible_fields` is not applicable to `roadmap` layout views. For `table` and `board` layouts, this represents the field IDs that should be visible in the view. If not provided, the default visible fields will be used.",
        items: {
          type: "integer",
        },
      },
      sort_by: {
        type: "array",
        description:
          'Sorting configuration for the view. Each element is a two-element array of `[field_id, direction]` where `direction` is `"asc"` or `"desc"`. Supports multiple sort criteria applied in order.',
        items: {
          type: "array",
          items: {},
        },
      },
      group_by: {
        type: "array",
        description:
          "The field IDs to group items by (horizontal grouping). Supports a single field. The field must support grouping; fields such as `Title`, `Reviewers`, `Linked pull requests`, `Sub-issues progress`, `Tracked by`, and `Tracks` cannot be grouped on.",
        items: {
          type: "integer",
        },
      },
      vertical_group_by: {
        type: "array",
        description:
          "The field IDs to use as columns in `board` layout (vertical grouping). Supports a single field. The field must support grouping; fields such as `Title`, `Reviewers`, `Linked pull requests`, `Sub-issues progress`, `Tracked by`, and `Tracks` cannot be grouped on.",
        items: {
          type: "integer",
        },
      },
    },
    required: ["user_id", "project_number", "name", "layout"],
  },
  request: {
    method: "POST",
    path: "/users/{user_id}/projectsV2/{project_number}/views",
    body: ["name", "layout", "filter", "visible_fields", "sort_by", "group_by", "vertical_group_by"],
  },
});
