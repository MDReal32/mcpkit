import { defineServer, defineUI } from '@usemcpkit/core';
import { createIssue } from './tools/issue/create';
import { getIssue } from './tools/issue/get';
import { listIssues } from './tools/issue/list';
import { listPullRequests } from './tools/pull-request/list';
import { getRepo } from './tools/repository/get';
import { searchRepositories } from './tools/repository/search';
import { getAuthenticatedUser } from './tools/user/me';

export const github = defineServer({
  name: 'github',
  category: 'git',
  version: '1.0.0',
  description: 'GitHub REST API: repositories, issues, pull requests, search.',
  baseUrl: 'https://{domain}',
  domain: {
    label: 'GitHub API host (GitHub Enterprise: <host>/api/v3)',
    default: 'api.github.com',
    env: 'GITHUB_API_HOST',
  },
  headers: {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
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
            label: 'Create on GitHub ↗',
            url: 'https://{webHost}/settings/personal-access-tokens/new?name=mcpkit+{server}&description=Used+by+mcpkit&issues=write&pull_requests=read',
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
  tools: [getAuthenticatedUser, getRepo, listIssues, getIssue, createIssue, listPullRequests, searchRepositories],
});
