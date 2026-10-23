import { SERVER_DESCRIPTION, SERVER_NAME } from './const.ts';

export const renderServerFile = () =>
  `import { defineGithubServer } from '../../providers/github';
import { githubTools } from './tools';

export const github = defineGithubServer({
  name: '${SERVER_NAME}',
  description: ${JSON.stringify(SERVER_DESCRIPTION)},
  tools: githubTools,
});
`;
