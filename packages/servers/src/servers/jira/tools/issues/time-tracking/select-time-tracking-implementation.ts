import { defineTool } from '@usemcpkit/core';

export const issuesTimeTrackingSelectTimeTrackingImplementation = defineTool({
  name: 'issues:time_tracking:select_time_tracking_implementation',
  description: 'Select time tracking provider. Selects a time tracking provider.',
  input: {
    type: 'object',
    properties: {
      key: {
        type: 'string',
        description: 'The key for the time tracking provider. For example, *JIRA*.',
      },
      name: {
        type: 'string',
        description: 'The name of the time tracking provider. For example, *JIRA provided time tracking*.',
      },
      url: {
        type: 'string',
        description:
          'The URL of the configuration page for the time tracking provider app. For example, */example/config/url*. This property is only returned if the `adminPageKey` property is set in the module descriptor of the time tracking provider app.',
      },
    },
    required: ['key'],
  },
  request: {
    method: 'PUT',
    path: '/rest/api/2/configuration/timetracking',
    body: ['key', 'name', 'url'],
  },
});
