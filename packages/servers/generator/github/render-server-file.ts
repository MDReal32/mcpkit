import { toolsArrayName } from './render-tools-index-file.ts';
import { toCamelCase } from './to-camel-case.ts';

export const renderServerFile = (folder: string, description: string) =>
  `import { defineGithubServer } from '../../../providers/github';
import { ${toolsArrayName(folder)} } from './tools';

export const ${toCamelCase(folder)} = defineGithubServer({
  name: '${folder.replaceAll(/[-/]/g, '_')}',
  description: ${JSON.stringify(description)},
  tools: ${toolsArrayName(folder)},
});
`;
