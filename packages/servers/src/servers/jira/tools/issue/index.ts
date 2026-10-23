import { createIssue } from './create';
import { getIssue } from './get';
import { searchIssues } from './search';
import { transitionIssue } from './transition';

export const issueTools = [createIssue, getIssue, searchIssues, transitionIssue];
