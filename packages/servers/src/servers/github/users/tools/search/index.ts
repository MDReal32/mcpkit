import { searchCode } from './code';
import { searchCommits } from './commits';
import { searchIssuesAndPullRequests } from './issues-and-pull-requests';
import { searchLabels } from './labels';
import { searchRepos } from './repos';
import { searchTopics } from './topics';
import { searchUsers } from './users';

export const searchTools = [
  searchCode,
  searchCommits,
  searchIssuesAndPullRequests,
  searchLabels,
  searchRepos,
  searchTopics,
  searchUsers,
];
