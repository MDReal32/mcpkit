import { defineTool, input } from '@usemcpkit/core';
import { REPO_PARAMS } from '../const';

export const getRepo = defineTool({
  name: 'get_repo',
  description: 'Get details of a repository.',
  input: input(REPO_PARAMS),
  request: { method: 'GET', path: '/repos/{owner}/{repo}' },
  response: {
    fields: {
      full_name: 'full_name',
      description: 'description',
      url: 'html_url',
      default_branch: 'default_branch',
      stars: 'stargazers_count',
      open_issues: 'open_issues_count',
      language: 'language',
      private: 'private',
    },
  },
});
