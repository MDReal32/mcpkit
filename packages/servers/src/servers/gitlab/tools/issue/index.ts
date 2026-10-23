import { addIssueComment } from './add-comment';
import { createIssue } from './create';
import { getIssue } from './get';
import { listIssues } from './list';

export const issueTools = [addIssueComment, createIssue, getIssue, listIssues];
