import { defineServer, defineUI } from '@usemcpkit/core';
import { addIssueComment } from './tools/issue/add-comment';
import { createIssue } from './tools/issue/create';
import { getIssue } from './tools/issue/get';
import { listIssues } from './tools/issue/list';
import { addMergeRequestComment } from './tools/merge-request/add-comment';
import { getMergeRequest } from './tools/merge-request/get';
import { listMergeRequests } from './tools/merge-request/list';
import { listPipelines } from './tools/pipeline/list';
import { getProject } from './tools/project/get';
import { listProjects } from './tools/project/list';
import { getCurrentUser } from './tools/user/me';

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
  tools: [
    getCurrentUser,
    listProjects,
    getProject,
    listIssues,
    getIssue,
    createIssue,
    addIssueComment,
    listMergeRequests,
    getMergeRequest,
    addMergeRequestComment,
    listPipelines,
  ],
});
