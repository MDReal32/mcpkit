import { number, string } from '@usemcpkit/core';

export const ISSUE_KEY = string('Issue key, for example PROJ-123');

export const MAX_RESULTS = number('Maximum number of results (max 100)', { default: 25 });

export const ISSUE_LIST_FIELDS = 'summary,status,assignee,issuetype,priority,updated';

export const ISSUE_SUMMARY_FIELDS = {
  key: 'key',
  summary: 'fields.summary',
  status: 'fields.status.name',
  type: 'fields.issuetype.name',
  priority: 'fields.priority.name',
  assignee: 'fields.assignee.displayName',
  updated: 'fields.updated',
};

export const PROJECT_FIELDS = { key: 'key', name: 'name', type: 'projectTypeKey' };
