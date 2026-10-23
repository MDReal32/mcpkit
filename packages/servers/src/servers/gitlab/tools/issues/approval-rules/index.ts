import { issuesApprovalRulesCreateGroupsApprovalRules } from "./create-groups-approval-rules";
import { issuesApprovalRulesCreateProjectsApprovalRules } from "./create-projects-approval-rules";
import { issuesApprovalRulesCreateProjectsApprovalSettingsRules } from "./create-projects-approval-settings-rules";
import { issuesApprovalRulesDeleteProjectsApprovalRules } from "./delete-projects-approval-rules";
import { issuesApprovalRulesDeleteProjectsApprovalSettingsRules } from "./delete-projects-approval-settings-rules";
import { issuesApprovalRulesGetProjectsApprovalRules } from "./get-projects-approval-rules";
import { issuesApprovalRulesListGroupsApprovalRules } from "./list-groups-approval-rules";
import { issuesApprovalRulesListProjectsApprovalRules } from "./list-projects-approval-rules";
import { issuesApprovalRulesListProjectsApprovalSettings } from "./list-projects-approval-settings";
import { issuesApprovalRulesUpdateGroupsApprovalRules } from "./update-groups-approval-rules";
import { issuesApprovalRulesUpdateProjectsApprovalRules } from "./update-projects-approval-rules";
import { issuesApprovalRulesUpdateProjectsApprovalSettingsRules } from "./update-projects-approval-settings-rules";

export const issuesApprovalRulesTools = [
  issuesApprovalRulesCreateGroupsApprovalRules,
  issuesApprovalRulesCreateProjectsApprovalRules,
  issuesApprovalRulesCreateProjectsApprovalSettingsRules,
  issuesApprovalRulesDeleteProjectsApprovalRules,
  issuesApprovalRulesDeleteProjectsApprovalSettingsRules,
  issuesApprovalRulesGetProjectsApprovalRules,
  issuesApprovalRulesListGroupsApprovalRules,
  issuesApprovalRulesListProjectsApprovalRules,
  issuesApprovalRulesListProjectsApprovalSettings,
  issuesApprovalRulesUpdateGroupsApprovalRules,
  issuesApprovalRulesUpdateProjectsApprovalRules,
  issuesApprovalRulesUpdateProjectsApprovalSettingsRules,
];
