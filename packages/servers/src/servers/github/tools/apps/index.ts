import { appsAppsTools } from './apps';
import { appsCodespacesTools } from './codespaces';
import { appsPackagesTools } from './packages';

export const appsGroupTools = [...appsAppsTools, ...appsCodespacesTools, ...appsPackagesTools];
