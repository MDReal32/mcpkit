import { securityCompliancePolicySettingsGetAdminSecurityCompliancePolicySettings } from './get-admin-security-compliance-policy-settings';
import { securityCompliancePolicySettingsUpdateAdminSecurityCompliancePolicySettings } from './update-admin-security-compliance-policy-settings';
import { securityCompliancePolicySettingsUpdateProjectsComplianceExternalControlsStatus } from './update-projects-compliance-external-controls-status';

export const securityCompliancePolicySettingsTools = [
  securityCompliancePolicySettingsGetAdminSecurityCompliancePolicySettings,
  securityCompliancePolicySettingsUpdateAdminSecurityCompliancePolicySettings,
  securityCompliancePolicySettingsUpdateProjectsComplianceExternalControlsStatus,
];
