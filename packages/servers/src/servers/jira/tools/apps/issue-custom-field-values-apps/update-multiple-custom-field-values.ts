import { defineTool } from "@usemcpkit/core";

export const appsIssueCustomFieldValuesAppsUpdateMultipleCustomFieldValues = defineTool({
  name: "apps:issue_custom_field_values_apps:update_multiple_custom_field_values",
  description:
    "Update custom fields. Updates the value of one or more custom fields on one or more issues. Combinations of custom field and issue should be unique within the request.",
  input: {
    type: "object",
    properties: {
      generateChangelog: {
        type: "boolean",
        default: true,
        description: "Whether to generate a changelog for this update.",
      },
      generateAppEvents: {
        type: "boolean",
        default: true,
        description:
          'Whether to generate app events for this update. Suppresses Forge, Connect, OAuth 2.0, and admin-configured webhooks (registered via the Jira admin UI). Note: Suppressing events means that "issue updated" events will not be emitted for your app or any other apps installed in Jira. This may cause other apps to retain stale data for the updated field, resulting in potentially confusing behaviour. We…',
      },
      updates: {
        type: "array",
        items: {
          type: "object",
          description: "A custom field and its new value with a list of issue to update.",
          properties: {
            customField: {
              type: "string",
              description: "The ID or key of the custom field. For example, `customfield_10010`.",
            },
            issueIds: {
              type: "array",
              description: "The list of issue IDs.",
              items: {
                type: "integer",
              },
            },
            value: {
              description:
                "The value for the custom field. The value must be compatible with the custom field type as follows:",
            },
          },
          required: ["customField", "issueIds", "value"],
        },
      },
    },
  },
  request: {
    method: "POST",
    path: "/rest/api/2/app/field/value",
    query: ["generateChangelog", "generateAppEvents"],
    body: ["updates"],
  },
});
