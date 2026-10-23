import { defineTool } from '@usemcpkit/core';

export const issuesProjectsAddFieldForOrg = defineTool({
  name: 'issues:projects:add_field_for_org',
  description: 'Add a field to an organization-owned project. Add a field to an organization-owned project.',
  input: {
    type: 'object',
    properties: {
      project_number: {
        type: 'integer',
        description: "The project's number.",
      },
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      issue_field_id: {
        type: 'integer',
        description: 'The ID of the IssueField to create the field for.',
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
    required: ['project_number', 'org'],
  },
  request: {
    method: 'POST',
    path: '/orgs/{org}/projectsV2/{project_number}/fields',
    body: ['issue_field_id', 'name', 'data_type', 'single_select_options', 'iteration_configuration'],
  },
});
