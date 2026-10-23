import { actionsGroupTools } from './actions';
import { appsGroupTools } from './apps';
import { copilotGroupTools } from './copilot';
import { issuesGroupTools } from './issues';
import { metaGroupTools } from './meta';
import { orgsGroupTools } from './orgs';
import { reposGroupTools } from './repos';
import { securityGroupTools } from './security';
import { usersGroupTools } from './users';

export const githubTools = [
  ...reposGroupTools,
  ...issuesGroupTools,
  ...actionsGroupTools,
  ...securityGroupTools,
  ...orgsGroupTools,
  ...usersGroupTools,
  ...appsGroupTools,
  ...copilotGroupTools,
  ...metaGroupTools,
];
