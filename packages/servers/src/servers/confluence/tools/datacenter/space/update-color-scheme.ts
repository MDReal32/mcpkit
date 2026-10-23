import { defineTool } from '@usemcpkit/core';

export const datacenterSpaceUpdateColorScheme = defineTool({
  name: 'datacenter:space:update_color_scheme',
  description: '[Data Center] Update Space color scheme. Update the color scheme for a space',
  input: {
    type: 'object',
    properties: {
      spaceKey: {
        type: 'string',
        description: 'space key of the space to set color scheme for.',
      },
      colorSchemeModelLight: {
        type: 'object',
        properties: {
          topBarColor: {
            type: 'string',
          },
          topBarMenuSelectedBgColor: {
            type: 'string',
          },
          topBarMenuSelectedTextColor: {
            type: 'string',
          },
          breadcrumbsTextColor: {
            type: 'string',
          },
          headerButtonBgColor: {
            type: 'string',
          },
          headerButtonTextColor: {
            type: 'string',
          },
          searchFieldTextColor: {
            type: 'string',
          },
          searchFieldBgColor: {
            type: 'string',
          },
          menuItemSelectedBgColor: {
            type: 'string',
          },
          menuItemSelectedTextColor: {
            type: 'string',
          },
          menuItemTextColor: {
            type: 'string',
          },
          headingTextColor: {
            type: 'string',
          },
          linkColor: {
            type: 'string',
          },
        },
      },
      colorSchemeModelDark: {
        type: 'object',
        properties: {
          topBarColor: {
            type: 'string',
          },
          topBarMenuSelectedBgColor: {
            type: 'string',
          },
          topBarMenuSelectedTextColor: {
            type: 'string',
          },
          breadcrumbsTextColor: {
            type: 'string',
          },
          headerButtonBgColor: {
            type: 'string',
          },
          headerButtonTextColor: {
            type: 'string',
          },
          searchFieldTextColor: {
            type: 'string',
          },
          searchFieldBgColor: {
            type: 'string',
          },
          menuItemSelectedBgColor: {
            type: 'string',
          },
          menuItemSelectedTextColor: {
            type: 'string',
          },
          menuItemTextColor: {
            type: 'string',
          },
          headingTextColor: {
            type: 'string',
          },
          linkColor: {
            type: 'string',
          },
        },
      },
    },
    required: ['spaceKey'],
  },
  request: {
    method: 'PUT',
    path: '/rest/api/space/{spaceKey}/color-scheme',
    body: ['colorSchemeModelLight', 'colorSchemeModelDark'],
  },
});
