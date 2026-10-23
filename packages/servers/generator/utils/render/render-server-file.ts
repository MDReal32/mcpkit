const capitalize = (word: string) => `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`;

export const renderServerFile = (serverName: string, serverDescription: string) =>
  `import { define${capitalize(serverName)}Server } from '../../providers/${serverName}';
import { ${serverName}Tools } from './tools';

export const ${serverName} = define${capitalize(serverName)}Server({
  name: '${serverName}',
  description: ${JSON.stringify(serverDescription)},
  tools: ${serverName}Tools,
});
`;
