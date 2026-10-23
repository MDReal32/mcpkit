import type { JiraOperation } from './types/jira-operation.ts';

export const toEntryKey = ({ source, spec }: JiraOperation) => `${source}:${spec.operationId ?? ''}`;
