import { groupArrayName, resourceArrayName } from './resource-array-name.ts';

export const renderGroupIndexFile = (group: string, resourceFolders: string[]) => {
  const imports = resourceFolders.map(
    (resourceFolder) => `import { ${resourceArrayName(group, resourceFolder)} } from './${resourceFolder}';`,
  );
  const spreads = resourceFolders.map((resourceFolder) => `  ...${resourceArrayName(group, resourceFolder)},`);
  return `${imports.join('\n')}

export const ${groupArrayName(group)} = [
${spreads.join('\n')}
];
`;
};
