import { number, oneOf, string } from '@mcpkit/core';

export const PROJECT = string('Project id or full path, for example group/subgroup/project');

export const ISSUE_IID = number('Issue number within the project (the #N shown in GitLab)');

export const MERGE_REQUEST_IID = number('Merge request number within the project (the !N shown in GitLab)');

export const ISSUE_STATE_FILTER = oneOf(['opened', 'closed', 'all'], 'Filter by state', { default: 'opened' });

export const MERGE_REQUEST_STATE_FILTER = oneOf(['opened', 'closed', 'merged', 'all'], 'Filter by state', {
  default: 'opened',
});

export const PER_PAGE = number('Results per page (max 100)', { default: 20 });

export const PAGE = number('Page number', { default: 1 });

export const PROJECT_FIELDS = {
  id: 'id',
  path: 'path_with_namespace',
  description: 'description',
  default_branch: 'default_branch',
  url: 'web_url',
  last_activity_at: 'last_activity_at',
};

export const ISSUE_FIELDS = {
  iid: 'iid',
  title: 'title',
  state: 'state',
  author: 'author.username',
  assignees: 'assignees[].username',
  labels: 'labels',
  url: 'web_url',
  updated_at: 'updated_at',
};

export const MERGE_REQUEST_FIELDS = {
  iid: 'iid',
  title: 'title',
  state: 'state',
  author: 'author.username',
  source_branch: 'source_branch',
  target_branch: 'target_branch',
  draft: 'draft',
  url: 'web_url',
  updated_at: 'updated_at',
};
