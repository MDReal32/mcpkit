import { defineTool } from '@usemcpkit/core';

export const issuesEpicsCreateGroupsEpicsEpics = defineTool({
  name: 'issues:epics:create_groups_epics_epics',
  description:
    'Create and relate epic to a parent. Creates a new epic and associates it with the provided parent epic.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      epic_iid: {
        type: 'integer',
        description: 'Internal ID of the epic.',
      },
      title: {
        type: 'string',
        description: 'Title of the child epic.',
      },
      confidential: {
        type: 'boolean',
        description:
          'If `true`, marks the epic as confidential. Ignored if the `confidential_epics` feature flag is disabled. Defaults to the confidentiality state of the parent epic.',
      },
    },
    required: ['id', 'epic_iid', 'title'],
  },
  request: {
    method: 'POST',
    path: '/groups/{id}/(-/)epics/{epic_iid}/epics',
    body: ['title', 'confidential'],
  },
});
