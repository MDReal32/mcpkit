import type { AuthSpec } from '../types/auth/auth-spec';
import type { InteractiveAuth } from '../types/auth/interactive-auth';

/** OAuth2 auth signs in through the browser and keeps its token in `tokens.json`. */
export const isInteractiveAuth = (auth: AuthSpec): auth is InteractiveAuth => auth.type === 'oauth';
