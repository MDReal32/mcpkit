import { SERVER_DESCRIPTION, SERVER_NAME } from './const.ts';

export const renderServerFile = () =>
  `import { defineJiraServer } from '../../providers/jira';
import { jiraTools } from './tools';

export const jira = defineJiraServer({
  name: '${SERVER_NAME}',
  description: ${JSON.stringify(SERVER_DESCRIPTION)},
  tools: jiraTools,
});
`;
