import { pullRequestStacksAdd } from './add';
import { pullRequestStacksCreate } from './create';
import { pullRequestStacksGet } from './get';
import { pullRequestStacksList } from './list';
import { pullRequestStacksUnstack } from './unstack';

export const pullRequestStacksTools = [
  pullRequestStacksAdd,
  pullRequestStacksCreate,
  pullRequestStacksGet,
  pullRequestStacksList,
  pullRequestStacksUnstack,
];
