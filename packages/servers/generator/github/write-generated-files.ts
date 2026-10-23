import { mkdir, rm, writeFile } from 'node:fs/promises';
import { basename, dirname, join } from 'node:path';
import { groupByResource } from './group-by-resource.ts';
import { renderResourceIndexFile } from './render-resource-index-file.ts';
import { renderServerFile } from './render-server-file.ts';
import { renderToolFile } from './render-tool-file.ts';
import { renderToolsIndexFile } from './render-tools-index-file.ts';
import type { GeneratedTool } from './types/generated-tool.ts';

const writeText = async (file: string, content: string) => {
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, content);
};

export const writeGeneratedFiles = async (
  serversDir: string,
  folder: string,
  description: string,
  tools: GeneratedTool[],
) => {
  const serverDir = join(serversDir, folder);
  await rm(serverDir, { recursive: true, force: true });
  await Promise.all(
    tools.map((tool) =>
      writeText(join(serverDir, 'tools', tool.resourceFolder, `${tool.actionFile}.ts`), renderToolFile(tool)),
    ),
  );
  const resources = groupByResource(tools);
  await Promise.all(
    [...resources].map(([resourceFolder, resourceTools]) =>
      writeText(
        join(serverDir, 'tools', resourceFolder, 'index.ts'),
        renderResourceIndexFile(resourceFolder, resourceTools),
      ),
    ),
  );
  await writeText(join(serverDir, 'tools', 'index.ts'), renderToolsIndexFile(folder, [...resources.keys()]));
  await writeText(join(serverDir, `${basename(folder)}.ts`), renderServerFile(folder, description));
};
