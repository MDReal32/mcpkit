import type { ServerGroup } from '../types/server-group.ts';

export const findGroupName = (groups: readonly ServerGroup[], category: string) =>
  groups.find((candidate) => candidate.categories.includes(category))?.name;
