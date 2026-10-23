import type { InteractiveAuth } from '../../manifest';

export const toAuthKey = (auth: InteractiveAuth) => `oauth ${auth.tokenUrl}`;
