import { defineTool } from '@usemcpkit/core';

export const appsIssueCustomFieldOptionsAppsDeleteIssueFieldOption = defineTool({
  name: 'apps:issue_custom_field_options_apps:delete_issue_field_option',
  description: 'Delete issue field option. Deletes an option from a select list issue field.',
  input: {
    type: 'object',
    properties: {
      fieldKey: {
        type: 'string',
        description:
          'The field key is specified in the following format: **$(app-key)\\_\\_$(field-key)**. For example, *example-add-on\\_\\_example-issue-field*. To determine the `fieldKey` value, do one of the following:',
      },
      optionId: {
        type: 'integer',
        description: 'The ID of the option to be deleted.',
      },
    },
    required: ['fieldKey', 'optionId'],
  },
  request: {
    method: 'DELETE',
    path: '/rest/api/2/field/{fieldKey}/option/{optionId}',
  },
});
