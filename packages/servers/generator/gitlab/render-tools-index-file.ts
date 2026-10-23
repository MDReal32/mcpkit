import { SERVER_NAME } from './const.ts';
import { groupArrayName } from './resource-array-name.ts';

export const renderToolsIndexFile = (groups: string[]) => {
  const imports = groups.map((group) => `import { ${groupArrayName(group)} } from './${group}';`);
  const spreads = groups.map((group) => `  ...${groupArrayName(group)},`);
  return `${imports.join('\n')}

export const ${SERVER_NAME}Tools = [
${spreads.join('\n')}
];
`;
};
