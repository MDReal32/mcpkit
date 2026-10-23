import { writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildToolDefinition } from './build-tool-definition.ts';
import { collectOperations } from './collect-operations.ts';
import { SERVER_GROUPS } from './const.ts';
import { findUnsupportedReason } from './find-unsupported-reason.ts';
import { readSpec } from './read-spec.ts';
import { renderGroupIndexFile } from './render-group-index-file.ts';
import { toGeneratedTool, toToolNames } from './to-tool-names.ts';
import type { GeneratedTool } from './types/generated-tool.ts';
import { writeGeneratedFiles } from './write-generated-files.ts';

const SERVERS_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'src', 'servers');

const document = await readSpec(process.argv[2]);
const toolsByFolder = new Map<string, GeneratedTool[]>(SERVER_GROUPS.map((group) => [group.folder, []]));
const skipped: string[] = [];

for (const operation of collectOperations(document)) {
  const operationId = operation.spec.operationId ?? '';
  const group = SERVER_GROUPS.find((candidate) => candidate.categories.includes(operation.category));
  if (!group) {
    throw new Error(`${operationId}: category "${operation.category}" belongs to no server group`);
  }
  const reason = findUnsupportedReason(operation);
  if (reason) {
    skipped.push(`${operationId}: ${reason}`);
    continue;
  }
  const names = toToolNames(operationId);
  const tool = toGeneratedTool(group.folder, names, buildToolDefinition(operation, names.name));
  toolsByFolder.get(group.folder)?.push(tool);
}

for (const group of SERVER_GROUPS) {
  const tools = (toolsByFolder.get(group.folder) ?? []).sort((a, b) =>
    a.definition.name.localeCompare(b.definition.name),
  );
  await writeGeneratedFiles(SERVERS_DIR, group.folder, group.description, tools);
  process.stdout.write(`${group.folder}: ${tools.length} tools\n`);
}
await writeFile(
  join(SERVERS_DIR, 'github', 'index.ts'),
  renderGroupIndexFile(
    'github',
    SERVER_GROUPS.map((group) => group.folder),
  ),
);
process.stdout.write(`skipped ${skipped.length}:\n${skipped.map((line) => `  ${line}`).join('\n')}\n`);
