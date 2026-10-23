import type { JiraOperation } from "./types/jira-operation";

export const toEntryKey = ({ source, spec }: JiraOperation) => `${source}:${spec.operationId ?? ""}`;
