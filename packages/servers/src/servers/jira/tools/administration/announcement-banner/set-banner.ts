import { defineTool } from '@usemcpkit/core';

export const administrationAnnouncementBannerSetBanner = defineTool({
  name: 'administration:announcement_banner:set_banner',
  description: 'Update announcement banner configuration. Updates the announcement banner configuration.',
  input: {
    type: 'object',
    properties: {
      isDismissible: {
        type: 'boolean',
        description: 'Flag indicating if the announcement banner can be dismissed by the user.',
      },
      isEnabled: {
        type: 'boolean',
        description: 'Flag indicating if the announcement banner is enabled or not.',
      },
      message: {
        type: 'string',
        description: 'The text on the announcement banner.',
      },
      visibility: {
        type: 'string',
        description: 'Visibility of the announcement banner. Can be public or private.',
      },
    },
  },
  request: {
    method: 'PUT',
    path: '/rest/api/2/announcementBanner',
    body: ['isDismissible', 'isEnabled', 'message', 'visibility'],
  },
});
