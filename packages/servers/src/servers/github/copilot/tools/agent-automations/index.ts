import { agentAutomationsCreateRepoAutomation } from './create-repo-automation';
import { agentAutomationsDeleteRepoAutomation } from './delete-repo-automation';
import { agentAutomationsEditRepoAutomation } from './edit-repo-automation';
import { agentAutomationsGetAutomation } from './get-automation';
import { agentAutomationsGetRepoAutomation } from './get-repo-automation';
import { agentAutomationsListAutomationTasks } from './list-automation-tasks';
import { agentAutomationsListAutomations } from './list-automations';
import { agentAutomationsListAvailableAutomationTools } from './list-available-automation-tools';
import { agentAutomationsListAvailableAutomationTriggers } from './list-available-automation-triggers';
import { agentAutomationsListRepoAutomations } from './list-repo-automations';

export const agentAutomationsTools = [
  agentAutomationsCreateRepoAutomation,
  agentAutomationsDeleteRepoAutomation,
  agentAutomationsEditRepoAutomation,
  agentAutomationsGetAutomation,
  agentAutomationsGetRepoAutomation,
  agentAutomationsListAutomationTasks,
  agentAutomationsListAutomations,
  agentAutomationsListAvailableAutomationTools,
  agentAutomationsListAvailableAutomationTriggers,
  agentAutomationsListRepoAutomations,
];
