import { copilotAgentAutomationsCreateRepoAutomation } from "./create-repo-automation";
import { copilotAgentAutomationsDeleteRepoAutomation } from "./delete-repo-automation";
import { copilotAgentAutomationsEditRepoAutomation } from "./edit-repo-automation";
import { copilotAgentAutomationsGetAutomation } from "./get-automation";
import { copilotAgentAutomationsGetRepoAutomation } from "./get-repo-automation";
import { copilotAgentAutomationsListAutomationTasks } from "./list-automation-tasks";
import { copilotAgentAutomationsListAutomations } from "./list-automations";
import { copilotAgentAutomationsListAvailableAutomationTools } from "./list-available-automation-tools";
import { copilotAgentAutomationsListAvailableAutomationTriggers } from "./list-available-automation-triggers";
import { copilotAgentAutomationsListRepoAutomations } from "./list-repo-automations";

export const copilotAgentAutomationsTools = [
  copilotAgentAutomationsCreateRepoAutomation,
  copilotAgentAutomationsDeleteRepoAutomation,
  copilotAgentAutomationsEditRepoAutomation,
  copilotAgentAutomationsGetAutomation,
  copilotAgentAutomationsGetRepoAutomation,
  copilotAgentAutomationsListAutomationTasks,
  copilotAgentAutomationsListAutomations,
  copilotAgentAutomationsListAvailableAutomationTools,
  copilotAgentAutomationsListAvailableAutomationTriggers,
  copilotAgentAutomationsListRepoAutomations,
];
