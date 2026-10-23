import type { RejectedEntry } from './rejected-entry';
import type { UnchangedEntry } from './unchanged-entry';
import type { UpdatedEntry } from './updated-entry';

export type UpdateResult = UpdatedEntry | UnchangedEntry | RejectedEntry;
