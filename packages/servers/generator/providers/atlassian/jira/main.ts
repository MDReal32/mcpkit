import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildToolDefinition } from './build-tool-definition.ts';
import { collectOperations } from './collect-operations.ts';
import { EDITION_PAIRS, SERVER_GROUPS, SERVER_NAME, SPEC_SOURCES } from './const.ts';
import { dereferenceOperation } from './dereference-operation.ts';
import { findUnsupportedReason } from './find-unsupported-reason.ts';
import { mergeEditionDefinitions } from './merge-edition-definitions.ts';
import { readSpec } from './read-spec.ts';
import { toGeneratedTool, toToolNames } from './to-tool-names.ts';
import type { GeneratedTool } from './types/generated-tool.ts';
import { writeGeneratedFiles } from './write-generated-files.ts';

const SERVERS_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'src', 'servers');
const FIRST_LOCAL_PATH_ARGUMENT = 2;

const entries = new Map<string, GeneratedTool>();
const skipped: string[] = [];

for (const [position, source] of SPEC_SOURCES.entries()) {
  const document = await readSpec(source, process.argv[FIRST_LOCAL_PATH_ARGUMENT + position]);
  const index = document.components?.schemas ?? {};
  for (const collected of collectOperations(document, source)) {
    const operation = dereferenceOperation(collected, index);
    const operationId = operation.spec.operationId ?? '';
    const key = `${source.name}:${operationId}`;
    const groupName =
      source.group ?? SERVER_GROUPS.find((candidate) => candidate.categories.includes(operation.category))?.name;
    if (!groupName) {
      throw new Error(`${key}: category "${operation.category}" belongs to no server group`);
    }
    const reason = findUnsupportedReason(operation);
    if (reason) {
      skipped.push(`${key}: ${reason}`);
      continue;
    }
    if (entries.has(key)) {
      throw new Error(`${key}: duplicate operationId`);
    }
    const names = toToolNames(groupName, operation.category, operationId);
    entries.set(key, toGeneratedTool(names, buildToolDefinition(operation, names.name)));
  }
}

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
  skipped.push(
    `platform:${pair.dataCenter}: merged into ${cloud.definition.name} as its default (Data Center) request`,
  );
}

const tools = [...entries.values()].sort((a, b) => a.definition.name.localeCompare(b.definition.name));
const names = new Set(tools.map((tool) => tool.definition.name));
if (names.size !== tools.length) {
  throw new Error('two operations produced the same tool name');
}
await writeGeneratedFiles(
  SERVERS_DIR,
  SERVER_GROUPS.map((group) => group.name),
  tools,
);
process.stdout.write(`${SERVER_NAME}: ${tools.length} tools\n`);
process.stdout.write(`skipped ${skipped.length}:\n${skipped.map((line) => `  ${line}`).join('\n')}\n`);
