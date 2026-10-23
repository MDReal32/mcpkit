import { appsTools } from './apps';
import { codespacesTools } from './codespaces';
import { packagesTools } from './packages';

export const githubAppsTools = [...appsTools, ...codespacesTools, ...packagesTools];
