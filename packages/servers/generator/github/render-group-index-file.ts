import { toCamelCase } from './to-camel-case.ts';

export const renderGroupIndexFile = (group: string, folders: string[]) => {
  const names = folders.map(toCamelCase);
  const imports = folders.map((folder, index) => {
    const name = folder.slice(group.length + 1);
    return `import { ${names[index]} } from './${name}/${name}';`;
  });
  return `${imports.join('\n')}

export const ${group}Servers = [
${names.map((name) => `  ${name},`).join('\n')}
];
`;
};
