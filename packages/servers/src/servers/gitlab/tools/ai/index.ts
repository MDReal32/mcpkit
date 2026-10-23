import { aiActiveContextTools } from './active-context';
import { aiCodeSuggestionsTools } from './code-suggestions';
import { aiGitlabDuoTools } from './gitlab-duo';
import { aiGitlabDuoWorkflowsTools } from './gitlab-duo-workflows';
import { aiKnowledgeGraphTools } from './knowledge-graph';
import { aiOrbitTools } from './orbit';
import { aiTokenExchangeTools } from './token-exchange';

export const aiGroupTools = [
  ...aiActiveContextTools,
  ...aiCodeSuggestionsTools,
  ...aiGitlabDuoWorkflowsTools,
  ...aiGitlabDuoTools,
  ...aiKnowledgeGraphTools,
  ...aiOrbitTools,
  ...aiTokenExchangeTools,
];
