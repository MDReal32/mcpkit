import { defineTool } from '@usemcpkit/core';

export const appsIssueCustomFieldValuesAppsUpdateCustomFieldValue = defineTool({
  name: 'apps:issue_custom_field_values_apps:update_custom_field_value',
  description: 'Update custom field value. Updates the value of a custom field on one or more issues.',
  input: {
    type: 'object',
    properties: {
      fieldIdOrKey: {
        type: 'string',
        description: 'The ID or key of the custom field. For example, `customfield_10010`.',
      },
      generateChangelog: {
        type: 'boolean',
        default: true,
        description: 'Whether to generate a changelog for this update.',
      },
      generateAppEvents: {
        type: 'boolean',
        default: true,
        description:
          'Whether to generate app events for this update. Suppresses Forge, Connect, OAuth 2.0, and admin-configured webhooks (registered via the Jira admin UI). Note: Suppressing events means that "issue updated" events will not be emitted for your app or any other apps installed in Jira. This may cause other apps to retain stale data for the updated field, resulting in potentially confusing behaviour. We…',
      },
      updates: {
        type: 'array',
        description: 'The list of custom field update details.',
        items: {
          type: 'object',
          description: 'A list of issue IDs and the value to update a custom field to.',
          properties: {
            issueIds: {
              type: 'array',
              description: 'The list of issue IDs.',
              items: {
                type: 'integer',
              },
            },
            value: {
              description:
                'The value for the custom field. The value must be compatible with the custom field type as follows:',
            },
          },
          required: ['issueIds', 'value'],
        },
      },
    },
    required: ['fieldIdOrKey'],
  },
  request: {
    method: 'PUT',
    path: '/rest/api/2/app/field/{fieldIdOrKey}/value',
    query: ['generateChangelog', 'generateAppEvents'],
    body: ['updates'],
  },
});
