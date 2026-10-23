import { defineTool } from '@usemcpkit/core';

export const appsIssueCustomFieldOptionsAppsGetVisibleIssueFieldOptions = defineTool({
  name: 'apps:issue_custom_field_options_apps:get_visible_issue_field_options',
  description:
    'Get visible issue field options. Returns a paginated list of options for a select list issue field that can be viewed by the user.',
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
      projectId: {
        type: 'integer',
        description: 'Filters the results to options that are only available in the specified project.',
      },
    },
    required: ['fieldKey'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/field/{fieldKey}/option/suggestions/search',
    query: ['startAt', 'maxResults', 'projectId'],
  },
});
