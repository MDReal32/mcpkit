import { defineServer, defineUI } from '@usemcpkit/core';
import { jiraTools } from './tools';

export const jira = defineServer({
  name: 'jira',
  category: 'atlassian',
  version: '1.0.0',
  description: 'Jira REST API (Cloud and Data Center): search, read, create and move issues.',
  baseUrl: 'https://{domain}',
  domain: {
    label: 'Jira host (Cloud: <site>.atlassian.net, Data Center: <host>[/<context>])',
    env: 'JIRA_HOST',
  },
  editions: {
    cloud: { label: 'Cloud', hosts: ['.atlassian.net'] },
  },
  headers: { Accept: 'application/json' },
  auth: [
    {
      type: 'basic',
      usernameEnv: 'JIRA_USERNAME',
      passwordEnv: 'JIRA_API_TOKEN',
      label: 'Cloud: email + API token',
      ui: defineUI({
        inputs: {
          JIRA_USERNAME: { label: 'Email', placeholder: 'you@company.com' },
          JIRA_API_TOKEN: {
            label: 'API token',
            hint: 'Create it on id.atlassian.com; or set the JIRA_API_TOKEN environment variable.',
          },
        },
        actions: [
          {
            type: 'link',
            label: 'Create on Atlassian ↗',
            url: 'https://id.atlassian.com/manage-profile/security/api-tokens',
          },
        ],
      }),
    },
    {
      type: 'bearer',
      env: 'JIRA_PERSONAL_TOKEN',
      label: 'Data Center: personal access token',
      ui: defineUI({
        inputs: {
          JIRA_PERSONAL_TOKEN: { label: 'Personal access token', placeholder: 'Paste the token' },
        },
        actions: [
          {
            type: 'link',
            label: 'Create a personal access token ↗',
            url: 'https://{domain}/secure/ViewProfile.jspa?selectedTab=com.atlassian.pats.pats-plugin:jira-user-personal-access-tokens',
          },
        ],
      }),
    },
  ],
  tools: jiraTools,
});
