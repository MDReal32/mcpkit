import { actionsTools } from './actions';
import { oidcTools } from './oidc';

export const githubActionsTools = [...actionsTools, ...oidcTools];
