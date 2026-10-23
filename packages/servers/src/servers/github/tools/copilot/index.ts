import { copilotAgentAutomationsTools } from './agent-automations';
import { copilotAgentTasksTools } from './agent-tasks';
import { copilotAgentsTools } from './agents';
import { copilotCopilotTools } from './copilot';
import { copilotCopilotSpacesTools } from './copilot-spaces';

export const copilotGroupTools = [
  ...copilotAgentAutomationsTools,
  ...copilotAgentTasksTools,
  ...copilotAgentsTools,
  ...copilotCopilotSpacesTools,
  ...copilotCopilotTools,
];
