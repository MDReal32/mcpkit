import { resourceArrayName } from '../naming/resource-array-name.ts';
import type { GeneratedTool } from '../types/generated-tool.ts';

export const renderResourceIndexFile = (group: string, resourceFolder: string, tools: GeneratedTool[]) => {
  const imports = tools.map((tool) => `import { ${tool.identifier} } from './${tool.actionFile}';`);
  const identifiers = tools.map((tool) => `  ${tool.identifier},`);
  return `${imports.join('\n')}

export const ${resourceArrayName(group, resourceFolder)} = [
${identifiers.join('\n')}
];
`;
};
