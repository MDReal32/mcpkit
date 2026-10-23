import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildToolDefinition } from './build-tool-definition.ts';
import { collectOperations } from './collect-operations.ts';
import { SERVER_NAME, SPEC_SOURCES } from './const.ts';
import { findUnsupportedReason } from './find-unsupported-reason.ts';
import { nameOperations } from './name-operations.ts';
import { readSpec } from './read-spec.ts';
import { toGeneratedTool } from './to-tool-names.ts';
import type { GeneratedTool } from './types/generated-tool.ts';
import type { Operation } from './types/operation.ts';
import { writeGeneratedFiles } from './write-generated-files.ts';

const SERVERS_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'src', 'servers');
const FIRST_PATH_ARGUMENT = 2;

const tools: GeneratedTool[] = [];
const skipped: string[] = [];

for (const [index, source] of SPEC_SOURCES.entries()) {
  const document = await readSpec(source, process.argv[FIRST_PATH_ARGUMENT + index]);
  const supported: Operation[] = [];
  for (const operation of collectOperations(document, source)) {
    const reason = findUnsupportedReason(operation, source);
    if (reason) {
      skipped.push(`${source.group} ${operation.spec.operationId}: ${reason}`);
    } else {
      supported.push(operation);
    }
  }
  const names = nameOperations(supported, source);
  for (const [position, operation] of supported.entries()) {
    const toolNames = names[position];
    if (!toolNames) {
      throw new Error(`${operation.spec.operationId} was not named`);
    }
    tools.push(toGeneratedTool(toolNames, buildToolDefinition(operation, toolNames.name, source)));
  }
}

const identifiers = new Set<string>();
for (const tool of tools) {
  if (identifiers.has(tool.identifier)) {
    throw new Error(`identifier ${tool.identifier} is used by more than one tool`);
  }
  identifiers.add(tool.identifier);
}

tools.sort((a, b) => a.definition.name.localeCompare(b.definition.name));
await writeGeneratedFiles(
  SERVERS_DIR,
  SPEC_SOURCES.map((source) => source.group),
  tools,
);
process.stdout.write(`${SERVER_NAME}: ${tools.length} tools\n`);
process.stdout.write(`skipped ${skipped.length}:\n${skipped.map((line) => `  ${line}`).join('\n')}\n`);
