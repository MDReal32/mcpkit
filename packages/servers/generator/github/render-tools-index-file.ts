import { resourceArrayName } from './resource-array-name.ts';
import { toCamelCase } from './to-camel-case.ts';

export const toolsArrayName = (folder: string) => `${toCamelCase(folder)}Tools`;

export const renderToolsIndexFile = (folder: string, resourceFolders: string[]) => {
  const imports = resourceFolders.map(
    (resourceFolder) => `import { ${resourceArrayName(resourceFolder)} } from './${resourceFolder}';`,
  );
  const spreads = resourceFolders.map((resourceFolder) => `  ...${resourceArrayName(resourceFolder)},`);
  return `${imports.join('\n')}

export const ${toolsArrayName(folder)} = [
${spreads.join('\n')}
];
`;
};
