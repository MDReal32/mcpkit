import { SERVER_DESCRIPTION, SERVER_NAME } from './const.ts';

export const renderServerFile = () =>
  `import { defineConfluenceServer } from '../../providers/confluence';
import { confluenceTools } from './tools';

export const confluence = defineConfluenceServer({
  name: '${SERVER_NAME}',
  description: ${JSON.stringify(SERVER_DESCRIPTION)},
  tools: confluenceTools,
});
`;
