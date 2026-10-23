import { rm } from "node:fs/promises";
import { join } from "node:path";
import type { GeneratedTool } from "../types/generated-tool";
import type { ServerOutput } from "../types/server-output";
import { groupToolsBy } from "./group-tools-by";
import { renderGroupIndexFile } from "./render-group-index-file";
import { renderResourceIndexFile } from "./render-resource-index-file";
import { renderServerFile } from "./render-server-file";
import { renderToolFile } from "./render-tool-file";
import { renderToolsIndexFile } from "./render-tools-index-file";
import { writeText } from "./write-text";

export const writeGeneratedFiles = async (serversDir: string, output: ServerOutput, tools: GeneratedTool[]) => {
  const { serverName, serverDescription, groups, groupArraySuffix } = output;
  const serverDir = join(serversDir, serverName);
  const toolsDir = join(serverDir, "tools");
  await rm(serverDir, { recursive: true, force: true });
  await Promise.all(
    tools.map((tool) =>
      writeText(join(toolsDir, tool.group, tool.resourceFolder, `${tool.actionFile}.ts`), renderToolFile(tool)),
    ),
  );
  const byGroup = groupToolsBy(tools, (tool) => tool.group);
  for (const [group, groupTools] of byGroup) {
    const byResource = groupToolsBy(groupTools, (tool) => tool.resourceFolder);
    await Promise.all(
      [...byResource].map(([resourceFolder, resourceTools]) =>
        writeText(
          join(toolsDir, group, resourceFolder, "index.ts"),
          renderResourceIndexFile(group, resourceFolder, resourceTools),
        ),
      ),
    );
    await writeText(
      join(toolsDir, group, "index.ts"),
      renderGroupIndexFile(group, [...byResource.keys()], groupArraySuffix),
    );
  }
  await writeText(
    join(toolsDir, "index.ts"),
    renderToolsIndexFile(
      serverName,
      groups.filter((group) => byGroup.has(group)),
      groupArraySuffix,
    ),
  );
  await writeText(join(serverDir, `${serverName}.ts`), renderServerFile(serverName, serverDescription));
};
