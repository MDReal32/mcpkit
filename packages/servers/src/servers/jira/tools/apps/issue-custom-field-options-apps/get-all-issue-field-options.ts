import { defineTool } from '@usemcpkit/core';

export const appsIssueCustomFieldOptionsAppsGetAllIssueFieldOptions = defineTool({
  name: 'apps:issue_custom_field_options_apps:get_all_issue_field_options',
  description:
    'Get all issue field options. Returns a paginated list of all the options of a select list issue field. A select list issue field is a type of issue field that enables a user to select a value from a list of options.',
  input: {
    type: 'object',
    properties: {
      fieldKey: {
        type: 'string',
        description:
          'The field key is specified in the following format: **$(app-key)\\_\\_$(field-key)**. For example, *example-add-on\\_\\_example-issue-field*. To determine the `fieldKey` value, do one of the following:',
      },
      startAt: {
        type: 'integer',
        default: 0,
        description: 'The index of the first item to return in a page of results (page offset).',
      },
      maxResults: {
        type: 'integer',
        default: 50,
        description: 'The maximum number of items to return per page.',
      },
    },
    required: ['fieldKey'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/field/{fieldKey}/option',
    query: ['startAt', 'maxResults'],
  },
});
