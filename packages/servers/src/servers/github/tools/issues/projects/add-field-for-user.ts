import { defineTool } from '@usemcpkit/core';

export const issuesProjectsAddFieldForUser = defineTool({
  name: 'issues:projects:add_field_for_user',
  description: 'Add field to user owned project. Add a field to a specified user owned project.',
  input: {
    type: 'object',
    properties: {
      username: {
        type: 'string',
        description: 'The handle for the GitHub user account.',
      },
      project_number: {
        type: 'integer',
        description: "The project's number.",
      },
      name: {
        type: 'string',
        description: 'The name of the field.',
      },
      data_type: {
        type: 'string',
        description: "The field's data type.",
        enum: ['iteration'],
      },
      single_select_options: {
        type: 'array',
        description:
          'The options available for single select fields. At least one option must be provided when creating a single select field.',
        items: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'The display name of the option.',
            },
            color: {
              type: 'string',
              description: 'The color associated with the option.',
              enum: ['BLUE', 'GRAY', 'GREEN', 'ORANGE', 'PINK', 'PURPLE', 'RED', 'YELLOW'],
            },
            description: {
              type: 'string',
              description: 'The description of the option.',
            },
          },
        },
      },
      iteration_configuration: {
        type: 'object',
        description: 'The configuration for iteration fields.',
        properties: {
          start_date: {
            type: 'string',
            description: 'The start date of the first iteration.',
          },
          duration: {
            type: 'integer',
            description: 'The default duration for iterations in days. Individual iterations can override this value.',
          },
          iterations: {
            type: 'array',
            description: 'Zero or more iterations for the field.',
            items: {
              type: 'object',
            },
          },
        },
        required: ['start_date', 'duration'],
      },
    },
    required: ['username', 'project_number', 'name', 'data_type'],
  },
  request: {
    method: 'POST',
    path: '/users/{username}/projectsV2/{project_number}/fields',
    body: ['name', 'data_type', 'single_select_options', 'iteration_configuration'],
  },
});
