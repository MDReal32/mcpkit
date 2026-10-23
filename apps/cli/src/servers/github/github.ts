import { defineServer, defineUI } from '@mcpkit/core';
import { createIssue } from './tools/create-issue';
import { getAuthenticatedUser } from './tools/get-authenticated-user';
import { getIssue } from './tools/get-issue';
import { getRepo } from './tools/get-repo';
import { listIssues } from './tools/list-issues';
import { listPullRequests } from './tools/list-pull-requests';
import { searchRepositories } from './tools/search-repositories';

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
