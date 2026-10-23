import { defineTool, input } from '@usemcpkit/core';
import { ISSUE_KEY } from '../const';

export const getIssue = defineTool({
  name: 'get_issue',
  description: 'Get an issue with its description and comments.',
  input: input({ issue_key: ISSUE_KEY }),
  request: { method: 'GET', path: '/rest/api/2/issue/{issue_key}' },
  response: {
    fields: {
      key: 'key',
      summary: 'fields.summary',
      status: 'fields.status.name',
      type: 'fields.issuetype.name',
      priority: 'fields.priority.name',
      assignee: 'fields.assignee.displayName',
      reporter: 'fields.reporter.displayName',
      description: 'fields.description',
      labels: 'fields.labels',
      created: 'fields.created',
      updated: 'fields.updated',
      comments: 'fields.comment.comments[].body',
      comment_ids: 'fields.comment.comments[].id',
    },
  },
});
