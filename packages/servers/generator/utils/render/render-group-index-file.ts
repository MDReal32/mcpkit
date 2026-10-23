import { groupArrayName } from '../naming/group-array-name.ts';
import { resourceArrayName } from '../naming/resource-array-name.ts';

export const renderGroupIndexFile = (group: string, resourceFolders: string[], groupArraySuffix: string) => {
  const imports = resourceFolders.map(
    (resourceFolder) => `import { ${resourceArrayName(group, resourceFolder)} } from './${resourceFolder}';`,
  );
  const spreads = resourceFolders.map((resourceFolder) => `  ...${resourceArrayName(group, resourceFolder)},`);
  return `${imports.join('\n')}

export const ${groupArrayName(group, groupArraySuffix)} = [
${spreads.join('\n')}
];
`;
};
