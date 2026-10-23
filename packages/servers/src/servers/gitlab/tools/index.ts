import { adminGroupTools } from './admin';
import { aiGroupTools } from './ai';
import { ciGroupTools } from './ci';
import { groupsGroupTools } from './groups';
import { issuesGroupTools } from './issues';
import { metaGroupTools } from './meta';
import { packagesGroupTools } from './packages';
import { projectsGroupTools } from './projects';
import { securityGroupTools } from './security';
import { usersGroupTools } from './users';

export const gitlabTools = [
  ...projectsGroupTools,
  ...issuesGroupTools,
  ...ciGroupTools,
  ...packagesGroupTools,
  ...securityGroupTools,
  ...groupsGroupTools,
  ...usersGroupTools,
  ...adminGroupTools,
  ...aiGroupTools,
  ...metaGroupTools,
];
