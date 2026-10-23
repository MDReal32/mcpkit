import { defineTool } from '@usemcpkit/core';

export const campaignsCreateCampaign = defineTool({
  name: 'campaigns:create_campaign',
  description: 'Create a campaign for an organization. Create a campaign for an organization.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      name: {
        type: 'string',
        description: 'The name of the campaign',
      },
      description: {
        type: 'string',
        description: 'A description for the campaign',
      },
      managers: {
        type: 'array',
        description:
          'The logins of the users to set as the campaign managers. At this time, only a single manager can be supplied.',
        items: {
          type: 'string',
          description: 'The login of each manager',
        },
      },
      team_managers: {
        type: 'array',
        description: 'The slugs of the teams to set as the campaign managers.',
        items: {
          type: 'string',
          description: 'The slug of each team',
        },
      },
      ends_at: {
        type: 'string',
        description: 'The end date and time of the campaign. The date must be in the future.',
      },
      contact_link: {
        type: 'string',
        description: 'The contact link of the campaign. Must be a URI.',
      },
      code_scanning_alerts: {
        type: 'array',
        description: 'The code scanning alerts to include in this campaign',
        items: {
          type: 'object',
          properties: {
            repository_id: {
              type: 'integer',
              description: 'The repository id',
            },
            alert_numbers: {
              type: 'array',
              description: 'The alert numbers',
              items: {
                type: 'integer',
              },
            },
          },
          required: ['repository_id', 'alert_numbers'],
        },
      },
      generate_issues: {
        type: 'boolean',
        description: 'If true, will automatically generate issues for the campaign. The default is false.',
        default: false,
      },
    },
    required: ['org', 'name', 'description', 'ends_at'],
  },
  request: {
    method: 'POST',
    path: '/orgs/{org}/campaigns',
    body: [
      'name',
      'description',
      'managers',
      'team_managers',
      'ends_at',
      'contact_link',
      'code_scanning_alerts',
      'generate_issues',
    ],
  },
});
