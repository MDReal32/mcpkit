import { defineTool } from '@usemcpkit/core';

export const appsGetBySlug = defineTool({
  name: 'apps:get_by_slug',
  description:
    'Get an app. > [!NOTE] > The `:app_slug` is just the URL-friendly name of your GitHub App. You can find this on the settings page for your GitHub App (e.g., `https://github.com/settings/apps/:app_slug`).',
  input: {
    type: 'object',
    properties: {
      app_slug: {
        type: 'string',
      },
    },
    required: ['app_slug'],
  },
  request: {
    method: 'GET',
    path: '/apps/{app_slug}',
  },
});
