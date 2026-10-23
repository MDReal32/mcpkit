import type { GeneratedTool } from './types/generated-tool.ts';

const toCamelCase = (kebab: string) => kebab.replace(/[-/]([a-z])/g, (_match, letter: string) => letter.toUpperCase());

export const renderServerFile = (folder: string, description: string, tools: GeneratedTool[]) => {
  const imports = tools.map(
    (tool) => `import { ${tool.identifier} } from './tools/${tool.resourceFolder}/${tool.actionFile}';`,
  );
  const identifiers = tools.map((tool) => `    ${tool.identifier},`);
  return `import { defineGithubServer } from '../../../providers/github';

${imports.join('\n')}

export const ${toCamelCase(folder)} = defineGithubServer({
  name: '${folder.replaceAll(/[-/]/g, '_')}',
  description: ${JSON.stringify(description)},
  tools: [
${identifiers.join('\n')}
  ],
});
`;
};
