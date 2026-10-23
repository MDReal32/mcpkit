import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildToolDefinition } from './build-tool-definition.ts';
import { collectOperations } from './collect-operations.ts';
import { SERVER_GROUPS, SERVER_NAME } from './const.ts';
import { createNameAllocator } from './create-name-allocator.ts';
import { findUnsupportedReason } from './find-unsupported-reason.ts';
import { readSpec } from './read-spec.ts';
import { toGeneratedTool } from './to-tool-names.ts';
import type { GeneratedTool } from './types/generated-tool.ts';
import { writeGeneratedFiles } from './write-generated-files.ts';

const SERVERS_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'src', 'servers');

const document = await readSpec(process.argv[2]);
const allocateNames = createNameAllocator();
const tools: GeneratedTool[] = [];
const skipped: string[] = [];
const ungrouped = new Set<string>();

for (const operation of collectOperations(document)) {
  const operationId = operation.spec.operationId ?? '';
  const reason = findUnsupportedReason(operation);
  if (reason) {
    skipped.push(`${operationId}: ${reason}`);
    continue;
  }
  const group = SERVER_GROUPS.find((candidate) => candidate.categories.includes(operation.category));
  if (!group) {
    ungrouped.add(operation.category);
    continue;
  }
  const names = allocateNames(group.name, operation);
  tools.push(toGeneratedTool(names, buildToolDefinition(operation, names.name)));
}

if (ungrouped.size > 0) {
  throw new Error(`categories that belong to no server group: ${[...ungrouped].join(', ')}`);
}

tools.sort((a, b) => a.definition.name.localeCompare(b.definition.name));
await writeGeneratedFiles(
  SERVERS_DIR,
  SERVER_GROUPS.map((group) => group.name),
  tools,
);
process.stdout.write(`${SERVER_NAME}: ${tools.length} tools\n`);
process.stdout.write(`skipped ${skipped.length}:\n${skipped.map((line) => `  ${line}`).join('\n')}\n`);
