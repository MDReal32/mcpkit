import { groupArrayName } from '../naming/group-array-name';

export const renderToolsIndexFile = (serverName: string, groups: string[], groupArraySuffix: string) => {
  const imports = groups.map((group) => `import { ${groupArrayName(group, groupArraySuffix)} } from './${group}';`);
  const spreads = groups.map((group) => `  ...${groupArrayName(group, groupArraySuffix)},`);
  return `${imports.join('\n')}

export const ${serverName}Tools = [
${spreads.join('\n')}
];
`;
};
