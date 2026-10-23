import { mkdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { SERVER_NAME } from './const.ts';
import { renderGroupIndexFile } from './render-group-index-file.ts';
import { renderResourceIndexFile } from './render-resource-index-file.ts';
import { renderServerFile } from './render-server-file.ts';
import { renderToolFile } from './render-tool-file.ts';
import { renderToolsIndexFile } from './render-tools-index-file.ts';
import type { GeneratedTool } from './types/generated-tool.ts';

const writeText = async (file: string, content: string) => {
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, content);
};

const groupBy = <Key extends string>(tools: GeneratedTool[], keyOf: (tool: GeneratedTool) => Key) => {
  const groups = new Map<Key, GeneratedTool[]>();
  for (const tool of tools) {
    const key = keyOf(tool);
    groups.set(key, [...(groups.get(key) ?? []), tool]);
  }
  return groups;
};

export const writeGeneratedFiles = async (serversDir: string, groups: string[], tools: GeneratedTool[]) => {
  const serverDir = join(serversDir, SERVER_NAME);
  const toolsDir = join(serverDir, 'tools');
  await rm(serverDir, { recursive: true, force: true });
  await Promise.all(
    tools.map((tool) =>
      writeText(join(toolsDir, tool.group, tool.resourceFolder, `${tool.actionFile}.ts`), renderToolFile(tool)),
    ),
  );
  const byGroup = groupBy(tools, (tool) => tool.group);
  for (const [group, groupTools] of byGroup) {
    const byResource = groupBy(groupTools, (tool) => tool.resourceFolder);
    await Promise.all(
      [...byResource].map(([resourceFolder, resourceTools]) =>
        writeText(
          join(toolsDir, group, resourceFolder, 'index.ts'),
          renderResourceIndexFile(group, resourceFolder, resourceTools),
        ),
      ),
    );
    await writeText(join(toolsDir, group, 'index.ts'), renderGroupIndexFile(group, [...byResource.keys()]));
  }
  await writeText(join(toolsDir, 'index.ts'), renderToolsIndexFile(groups.filter((group) => byGroup.has(group))));
  await writeText(join(serverDir, `${SERVER_NAME}.ts`), renderServerFile());
};
