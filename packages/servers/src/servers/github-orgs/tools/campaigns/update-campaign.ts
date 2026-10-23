import { defineTool } from '@usemcpkit/core';

export const campaignsUpdateCampaign = defineTool({
  name: 'campaigns:update_campaign',
  description: 'Update a campaign. Updates a campaign in an organization.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      campaign_number: {
        type: 'integer',
        description: 'The campaign number.',
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
        description: "The end date and time of the campaign, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ.",
      },
      contact_link: {
        type: 'string',
        description: 'The contact link of the campaign. Must be a URI.',
      },
      state: {
        type: 'string',
        description: 'Indicates whether a campaign is open or closed',
        enum: ['open', 'closed'],
      },
    },
    required: ['org', 'campaign_number'],
  },
  request: {
    method: 'PATCH',
    path: '/orgs/{org}/campaigns/{campaign_number}',
    body: ['name', 'description', 'managers', 'team_managers', 'ends_at', 'contact_link', 'state'],
  },
});
