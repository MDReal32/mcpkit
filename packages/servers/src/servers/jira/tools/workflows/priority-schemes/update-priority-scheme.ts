import { defineTool } from '@usemcpkit/core';

export const workflowsPrioritySchemesUpdatePriorityScheme = defineTool({
  name: 'workflows:priority_schemes:update_priority_scheme',
  description:
    'Update priority scheme. Updates a priority scheme. This includes its details, the lists of priorities and projects in it',
  input: {
    type: 'object',
    properties: {
      schemeId: {
        type: 'integer',
        description: 'The ID of the priority scheme.',
      },
      defaultPriorityId: {
        type: 'integer',
        description: 'The default priority of the scheme.',
      },
      description: {
        type: 'string',
        description: 'The description of the priority scheme.',
      },
      mappings: {
        type: 'object',
        description: 'Instructions to migrate the priorities of issues.',
        properties: {
          in: {
            type: 'object',
            description:
              'The mapping of priorities for issues being migrated **into** this priority scheme. Key is the old priority ID, value is the new priority ID (must exist in this priority scheme).',
          },
          out: {
            type: 'object',
            description:
              'The mapping of priorities for issues being migrated **out of** this priority scheme. Key is the old priority ID (must exist in this priority scheme), value is the new priority ID (must exist in the default priority scheme). Required for updating an existing priority scheme. Not used when creating a new priority scheme.',
          },
        },
      },
      name: {
        type: 'string',
        description: 'The name of the priority scheme. Must be unique.',
      },
      priorities: {
        type: 'object',
        description: 'The priorities in the scheme.',
        properties: {
          add: {
            type: 'object',
            description: 'Priorities to add to a scheme',
            properties: {
              ids: {
                type: 'array',
                description: 'Affected entity ids.',
                items: {
                  type: 'integer',
                },
              },
            },
            required: ['ids'],
          },
          remove: {
            type: 'object',
            description: 'Priorities to remove from a scheme',
            properties: {
              ids: {
                type: 'array',
                description: 'Affected entity ids.',
                items: {
                  type: 'integer',
                },
              },
            },
            required: ['ids'],
          },
        },
      },
      projects: {
        type: 'object',
        description: 'The projects in the scheme.',
        properties: {
          add: {
            type: 'object',
            description: 'Projects to add to a scheme',
            properties: {
              ids: {
                type: 'array',
                description: 'Affected entity ids.',
                items: {
                  type: 'integer',
                },
              },
            },
            required: ['ids'],
          },
          remove: {
            type: 'object',
            description: 'Projects to remove from a scheme',
            properties: {
              ids: {
                type: 'array',
                description: 'Affected entity ids.',
                items: {
                  type: 'integer',
                },
              },
            },
            required: ['ids'],
          },
        },
      },
    },
    required: ['schemeId'],
  },
  request: {
    method: 'PUT',
    path: '/rest/api/2/priorityscheme/{schemeId}',
    body: ['defaultPriorityId', 'description', 'mappings', 'name', 'priorities', 'projects'],
  },
});
