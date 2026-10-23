import { agentAutomationsTools } from './agent-automations';
import { agentTasksTools } from './agent-tasks';
import { agentsTools } from './agents';
import { copilotTools } from './copilot';
import { copilotSpacesTools } from './copilot-spaces';

export const githubCopilotTools = [
  ...agentAutomationsTools,
  ...agentTasksTools,
  ...agentsTools,
  ...copilotSpacesTools,
  ...copilotTools,
];
