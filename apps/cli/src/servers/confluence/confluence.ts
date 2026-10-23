import { defineServer, defineUI } from '@mcpkit/core';
import { createPage } from './tools/create-page';
import { getPage } from './tools/get-page';
import { getPageChildren } from './tools/get-page-children';
import { listSpaces } from './tools/list-spaces';
import { search } from './tools/search';
import { updatePage } from './tools/update-page';

export const confluence = defineServer({
  name: 'confluence',
  category: 'atlassian',
  version: '1.0.0',
  description: 'Confluence REST API (Cloud and Data Center): search, read, create and update pages.',
  baseUrl: 'https://{domain}',
  domain: {
    label: 'Confluence host (Cloud: <site>.atlassian.net, Data Center: <host>[/<context>])',
    env: 'CONFLUENCE_HOST',
  },
  editions: {
    cloud: { label: 'Cloud', hosts: ['.atlassian.net'] },
  },
  headers: { Accept: 'application/json' },
  auth: [
    {
      type: 'basic',
      usernameEnv: 'CONFLUENCE_USERNAME',
      passwordEnv: 'CONFLUENCE_API_TOKEN',
      label: 'Cloud: email + API token',
      ui: defineUI({
        inputs: {
          CONFLUENCE_USERNAME: { label: 'Email', placeholder: 'you@company.com' },
          CONFLUENCE_API_TOKEN: {
            label: 'API token',
            hint: 'Create it on id.atlassian.com; or set the CONFLUENCE_API_TOKEN environment variable.',
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
      env: 'CONFLUENCE_PERSONAL_TOKEN',
      label: 'Data Center: personal access token',
      ui: defineUI({
        inputs: {
          CONFLUENCE_PERSONAL_TOKEN: { label: 'Personal access token', placeholder: 'Paste the token' },
        },
        actions: [
          {
            type: 'link',
            label: 'Create a personal access token ↗',
            url: 'https://{domain}/plugins/personalaccesstokens/usertokens.action',
          },
        ],
      }),
    },
  ],
  tools: [search, getPage, createPage, updatePage, listSpaces, getPageChildren],
});
