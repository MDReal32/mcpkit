import { defineTool } from '@usemcpkit/core';

export const campaignsDeleteCampaign = defineTool({
  name: 'campaigns:delete_campaign',
  description: 'Delete a campaign for an organization. Deletes a campaign in an organization.',
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
    },
    required: ['org', 'campaign_number'],
  },
  request: {
    method: 'DELETE',
    path: '/orgs/{org}/campaigns/{campaign_number}',
  },
});
