import { defineTool } from '@usemcpkit/core';

export const cloudV1SpaceSetSpaceTheme = defineTool({
  name: 'cloud_v1:space:set_space_theme',
  description:
    "[Cloud v1] Set space theme. Sets the theme for a space. Note, if you want to reset the space theme to the default Confluence theme, use the 'Reset space theme' method instead of this method.",
  input: {
    type: 'object',
    properties: {
      spaceKey: {
        type: 'string',
        description: 'The key of the space to set the theme for.',
      },
      themeKey: {
        type: 'string',
        description: 'The key of the theme to be set as the space theme.',
      },
    },
    required: ['spaceKey', 'themeKey'],
  },
  request: {
    method: 'PUT',
    path: '/wiki/rest/api/space/{spaceKey}/theme',
    body: ['themeKey'],
  },
});
