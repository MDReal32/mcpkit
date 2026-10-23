import { SERVER_DESCRIPTION, SERVER_NAME } from './const.ts';

export const renderServerFile = () =>
  `import { defineGitlabServer } from '../../providers/${SERVER_NAME}';
import { ${SERVER_NAME}Tools } from './tools';

export const ${SERVER_NAME} = defineGitlabServer({
  name: '${SERVER_NAME}',
  description: ${JSON.stringify(SERVER_DESCRIPTION)},
  tools: ${SERVER_NAME}Tools,
});
`;
