import { defineTool } from '@usemcpkit/core';

export const workflowsPrioritySchemesCreatePriorityScheme = defineTool({
  name: 'workflows:priority_schemes:create_priority_scheme',
  description: 'Create priority scheme. Creates a new priority scheme.',
  input: {
    type: 'object',
    properties: {
      defaultPriorityId: {
        type: 'integer',
        description: 'The ID of the default priority for the priority scheme.',
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
      priorityIds: {
        type: 'array',
        description: 'The IDs of priorities in the scheme.',
        items: {
          type: 'integer',
        },
      },
      projectIds: {
        type: 'array',
        description: 'The IDs of projects that will use the priority scheme.',
        items: {
          type: 'integer',
        },
      },
    },
    required: ['defaultPriorityId', 'name', 'priorityIds'],
  },
  request: {
    method: 'POST',
    path: '/rest/api/2/priorityscheme',
    body: ['defaultPriorityId', 'description', 'mappings', 'name', 'priorityIds', 'projectIds'],
  },
});
