import { defineTool } from '@usemcpkit/core';

export const appsIssueCustomFieldOptionsAppsGetIssueFieldOption = defineTool({
  name: 'apps:issue_custom_field_options_apps:get_issue_field_option',
  description: 'Get issue field option. Returns an option from a select list issue field.',
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
        description: 'The ID of the option to be returned.',
      },
    },
    required: ['fieldKey', 'optionId'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/field/{fieldKey}/option/{optionId}',
  },
});
