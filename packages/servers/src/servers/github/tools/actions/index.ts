import { actionsActionsTools } from './actions';
import { actionsOidcTools } from './oidc';

export const actionsGroupTools = [...actionsActionsTools, ...actionsOidcTools];
