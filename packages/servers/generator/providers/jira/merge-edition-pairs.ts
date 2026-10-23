import { findDuplicate } from '../../utils/pipeline/find-duplicate.ts';
import type { FinalizedTools } from '../../utils/types/finalized-tools.ts';
import type { GeneratedTool } from '../../utils/types/generated-tool.ts';
import type { PlannedTool } from '../../utils/types/planned-tool.ts';
import { EDITION_PAIRS } from './const.ts';
import { mergeEditionDefinitions } from './merge-edition-definitions.ts';
import { toEntryKey } from './to-entry-key.ts';
import type { JiraOperation } from './types/jira-operation.ts';

export const mergeEditionPairs = (planned: PlannedTool<JiraOperation>[]) => {
  const entries = new Map<string, GeneratedTool>();
  for (const { operation, tool } of planned) {
    const key = toEntryKey(operation);
    if (entries.has(key)) {
      throw new Error(`${key}: duplicate operationId`);
    }
    entries.set(key, tool);
  }
  const notes: string[] = [];
  for (const pair of EDITION_PAIRS) {
    const cloud = entries.get(`platform:${pair.cloud}`);
    const dataCenter = entries.get(`platform:${pair.dataCenter}`);
    if (!cloud || !dataCenter) {
      throw new Error(`edition pair ${pair.cloud} / ${pair.dataCenter} is missing from the spec`);
    }
    entries.set(`platform:${pair.cloud}`, {
      ...cloud,
      definition: mergeEditionDefinitions(cloud.definition, dataCenter.definition),
    });
    entries.delete(`platform:${pair.dataCenter}`);
    notes.push(
      `platform:${pair.dataCenter}: merged into ${cloud.definition.name} as its default (Data Center) request`,
    );
  }
  const tools = [...entries.values()];
  if (findDuplicate(tools.map((tool) => tool.definition.name)) !== undefined) {
    throw new Error('two operations produced the same tool name');
  }
  const finalized: FinalizedTools = { tools, notes };
  return finalized;
};
