import { defineServer, defineUI } from '@usemcpkit/core';
import { gitlabTools } from './tools';

export const gitlab = defineServer({
  name: 'gitlab',
  category: 'git',
  version: '1.0.0',
  description: 'GitLab REST API (gitlab.com and self-managed): projects, issues, merge requests, pipelines.',
  baseUrl: 'https://{domain}/api/v4',
  domain: {
    label: 'GitLab host (self-managed: <host>[/<relative url root>])',
    default: 'gitlab.com',
    env: 'GITLAB_HOST',
  },
  headers: { Accept: 'application/json' },
  auth: [
    {
      type: 'bearer',
      env: 'GITLAB_TOKEN',
      ui: defineUI({
        inputs: {
          GITLAB_TOKEN: { label: 'Personal access token', placeholder: 'glpat-…' },
        },
        actions: [
          {
            type: 'link',
            label: 'Create on GitLab ↗',
            url: 'https://{domain}/-/user_settings/personal_access_tokens?name=mcpkit+{server}&scopes=api',
          },
          {
            type: 'cli',
            label: 'Use GitLab CLI',
            command: 'glab',
            args: ['config', 'get', 'token', '--host', '{webHost}'],
          },
        ],
      }),
    },
  ],
  tools: gitlabTools,
});
