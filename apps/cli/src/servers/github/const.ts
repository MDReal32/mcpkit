import { number, oneOf, string } from '@mcpkit/core';

export const REPO_PARAMS = {
  owner: string('Repository owner (user or org)'),
  repo: string('Repository name'),
};

export const STATE_FILTER = oneOf(['open', 'closed', 'all'], 'Filter by state', { default: 'open' });

export const PER_PAGE = number('Results per page (max 100)', { default: 30 });

export const PAGE = number('Page number', { default: 1 });

export const ISSUE_FIELDS = {
  number: 'number',
  title: 'title',
  state: 'state',
  author: 'user.login',
  url: 'html_url',
  created_at: 'created_at',
};
