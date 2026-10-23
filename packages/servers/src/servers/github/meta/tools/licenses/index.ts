import { licensesGet } from './get';
import { licensesGetAllCommonlyUsed } from './get-all-commonly-used';
import { licensesGetForRepo } from './get-for-repo';

export const licensesTools = [licensesGet, licensesGetAllCommonlyUsed, licensesGetForRepo];
