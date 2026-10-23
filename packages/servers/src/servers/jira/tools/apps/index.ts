import { appsAppDataPoliciesTools } from './app-data-policies';
import { appsIssueCustomFieldConfigurationAppsTools } from './issue-custom-field-configuration-apps';
import { appsIssueCustomFieldOptionsAppsTools } from './issue-custom-field-options-apps';
import { appsIssueCustomFieldValuesAppsTools } from './issue-custom-field-values-apps';
import { appsUiModificationsAppsTools } from './ui-modifications-apps';

export const appsGroupTools = [
  ...appsAppDataPoliciesTools,
  ...appsIssueCustomFieldConfigurationAppsTools,
  ...appsIssueCustomFieldOptionsAppsTools,
  ...appsIssueCustomFieldValuesAppsTools,
  ...appsUiModificationsAppsTools,
];
