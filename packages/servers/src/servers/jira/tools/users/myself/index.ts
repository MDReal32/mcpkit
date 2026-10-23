import { usersMyselfGetCurrentUser } from './get-current-user';
import { usersMyselfGetLocale } from './get-locale';
import { usersMyselfGetPreference } from './get-preference';
import { usersMyselfRemovePreference } from './remove-preference';
import { usersMyselfSetLocale } from './set-locale';

export const usersMyselfTools = [
  usersMyselfGetCurrentUser,
  usersMyselfGetLocale,
  usersMyselfGetPreference,
  usersMyselfRemovePreference,
  usersMyselfSetLocale,
];
