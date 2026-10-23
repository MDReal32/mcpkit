import { fieldsFieldSchemesTools } from './field-schemes';
import { fieldsIssueCustomFieldAssociationsTools } from './issue-custom-field-associations';
import { fieldsIssueCustomFieldContextsTools } from './issue-custom-field-contexts';
import { fieldsIssueCustomFieldOptionsTools } from './issue-custom-field-options';
import { fieldsIssueFieldConfigurationsTools } from './issue-field-configurations';
import { fieldsIssueFieldsTools } from './issue-fields';
import { fieldsIssueNotificationSchemesTools } from './issue-notification-schemes';
import { fieldsIssueSecurityLevelTools } from './issue-security-level';
import { fieldsIssueSecuritySchemesTools } from './issue-security-schemes';
import { fieldsScreenSchemesTools } from './screen-schemes';
import { fieldsScreenTabFieldsTools } from './screen-tab-fields';
import { fieldsScreenTabsTools } from './screen-tabs';
import { fieldsScreensTools } from './screens';

export const fieldsGroupTools = [
  ...fieldsFieldSchemesTools,
  ...fieldsIssueCustomFieldAssociationsTools,
  ...fieldsIssueCustomFieldContextsTools,
  ...fieldsIssueCustomFieldOptionsTools,
  ...fieldsIssueFieldConfigurationsTools,
  ...fieldsIssueFieldsTools,
  ...fieldsIssueNotificationSchemesTools,
  ...fieldsIssueSecurityLevelTools,
  ...fieldsIssueSecuritySchemesTools,
  ...fieldsScreenSchemesTools,
  ...fieldsScreenTabFieldsTools,
  ...fieldsScreenTabsTools,
  ...fieldsScreensTools,
];
