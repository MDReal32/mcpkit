import { defineTool } from '@usemcpkit/core';

export const cloudV1SettingsResetLookAndFeelSettings = defineTool({
  name: 'cloud_v1:settings:reset_look_and_feel_settings',
  description:
    '[Cloud v1] Reset look and feel settings. Resets the custom look and feel settings for the site or a single space. This changes the values of the custom settings to be the same as the default settings. It does not change which settings (default or custom) are selected. Note, the default space settings are inherited from the current global settings.',
  input: {
    type: 'object',
    properties: {
      spaceKey: {
        type: 'string',
        description:
          'The key of the space for which the look and feel settings will be reset. If this is not set, the global look and feel settings will be reset.',
      },
    },
  },
  request: {
    method: 'DELETE',
    path: '/wiki/rest/api/settings/lookandfeel/custom',
    query: ['spaceKey'],
  },
});
