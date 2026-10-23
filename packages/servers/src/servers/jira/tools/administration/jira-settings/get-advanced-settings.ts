import { defineTool } from '@usemcpkit/core';

export const administrationJiraSettingsGetAdvancedSettings = defineTool({
  name: 'administration:jira_settings:get_advanced_settings',
  description:
    'Get advanced settings. Returns the application properties that are accessible on the *Advanced Settings* page. To navigate to the *Advanced Settings* page in Jira, choose the Jira icon > **Jira settings** > **System**, **General Configuration** and then click **Advanced Settings** (in the upper right).',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/application-properties/advanced-settings',
  },
});
