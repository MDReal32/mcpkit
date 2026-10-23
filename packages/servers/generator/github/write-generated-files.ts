import { mkdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { renderServerFile } from './render-server-file.ts';
import { renderToolFile } from './render-tool-file.ts';
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
  await writeText(join(serverDir, `${folder}.ts`), renderServerFile(folder, description, tools));
};
