import { validateAuthOrder } from './validate-auth-order';
import { validateAuthSpec } from './validate-auth-spec';

export const validateAuth = (auth: unknown, hasDomain: boolean) => {
  if (auth === undefined) {
    return [];
  }
  if (!Array.isArray(auth) || auth.length === 0) {
    return ['auth must be a non-empty array, tried from top to bottom'];
  }
  const entryErrors = auth.flatMap((entry, index) => validateAuthSpec(entry, `auth[${index}]`, hasDomain));
  return [...entryErrors, ...validateAuthOrder(auth)];
};
