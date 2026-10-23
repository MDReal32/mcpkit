import type { Manifest } from '@usemcpkit/core';
import { defineUI } from '@usemcpkit/core';

export const GITHUB_API_VERSION = '2022-11-28';

export const GITHUB_CLASSIC_SCOPES = [
  'repo',
  'workflow',
  'write:packages',
  'delete:packages',
  'admin:org',
  'admin:public_key',
  'admin:repo_hook',
  'admin:org_hook',
  'gist',
  'notifications',
  'user',
  'delete_repo',
  'write:discussion',
  'admin:enterprise',
  'audit_log',
  'codespace',
  'copilot',
  'project',
  'admin:gpg_key',
  'admin:ssh_signing_key',
];

export const GITHUB_BASE: Omit<Manifest, 'name' | 'description' | 'tools'> = {
  category: 'git',
  version: '1.0.0',
  baseUrl: 'https://{domain}',
  domain: {
    label: 'GitHub API host (GitHub Enterprise: <host>/api/v3)',
    default: 'api.github.com',
    env: 'GITHUB_API_HOST',
  },
  headers: {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': GITHUB_API_VERSION,
    'User-Agent': 'mcpkit',
  },
  auth: [
    {
      type: 'bearer',
      env: 'GITHUB_TOKEN',
      ui: defineUI({
        inputs: {
          GITHUB_TOKEN: { label: 'Access token', placeholder: 'ghp_… or github_pat_…' },
        },
        actions: [
          {
            type: 'link',
            label: 'Create fine-grained token ↗',
            url: 'https://{webHost}/settings/personal-access-tokens/new?name=mcpkit+{server}&description=Used+by+mcpkit',
          },
          {
            type: 'link',
            label: 'Create classic token ↗',
            url: `https://{webHost}/settings/tokens/new?description=mcpkit+{server}&scopes=${GITHUB_CLASSIC_SCOPES.join(',')}`,
          },
          {
            type: 'cli',
            label: 'Use GitHub CLI',
            command: 'gh',
            args: ['auth', 'token', '--hostname', '{webHost}'],
          },
        ],
      }),
    },
  ],
};
