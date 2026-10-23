import { githubActions } from './actions/actions';
import { githubApps } from './apps/apps';
import { githubCopilot } from './copilot/copilot';
import { githubIssues } from './issues/issues';
import { githubMeta } from './meta/meta';
import { githubOrgs } from './orgs/orgs';
import { githubRepos } from './repos/repos';
import { githubSecurity } from './security/security';
import { githubUsers } from './users/users';

export const githubServers = [
  githubRepos,
  githubIssues,
  githubActions,
  githubSecurity,
  githubOrgs,
  githubUsers,
  githubApps,
  githubCopilot,
  githubMeta,
];
