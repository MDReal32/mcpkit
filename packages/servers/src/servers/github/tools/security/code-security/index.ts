import { securityCodeSecurityAttachConfiguration } from "./attach-configuration";
import { securityCodeSecurityAttachEnterpriseConfiguration } from "./attach-enterprise-configuration";
import { securityCodeSecurityCreateConfiguration } from "./create-configuration";
import { securityCodeSecurityCreateConfigurationForEnterprise } from "./create-configuration-for-enterprise";
import { securityCodeSecurityDeleteConfiguration } from "./delete-configuration";
import { securityCodeSecurityDeleteConfigurationForEnterprise } from "./delete-configuration-for-enterprise";
import { securityCodeSecurityDetachConfiguration } from "./detach-configuration";
import { securityCodeSecurityGetConfiguration } from "./get-configuration";
import { securityCodeSecurityGetConfigurationForRepository } from "./get-configuration-for-repository";
import { securityCodeSecurityGetConfigurationsForEnterprise } from "./get-configurations-for-enterprise";
import { securityCodeSecurityGetConfigurationsForOrg } from "./get-configurations-for-org";
import { securityCodeSecurityGetDefaultConfigurations } from "./get-default-configurations";
import { securityCodeSecurityGetDefaultConfigurationsForEnterprise } from "./get-default-configurations-for-enterprise";
import { securityCodeSecurityGetRepositoriesForConfiguration } from "./get-repositories-for-configuration";
import { securityCodeSecurityGetRepositoriesForEnterpriseConfiguration } from "./get-repositories-for-enterprise-configuration";
import { securityCodeSecurityGetSingleConfigurationForEnterprise } from "./get-single-configuration-for-enterprise";
import { securityCodeSecuritySetConfigurationAsDefault } from "./set-configuration-as-default";
import { securityCodeSecuritySetConfigurationAsDefaultForEnterprise } from "./set-configuration-as-default-for-enterprise";
import { securityCodeSecurityUpdateConfiguration } from "./update-configuration";
import { securityCodeSecurityUpdateEnterpriseConfiguration } from "./update-enterprise-configuration";

export const securityCodeSecurityTools = [
  securityCodeSecurityAttachConfiguration,
  securityCodeSecurityAttachEnterpriseConfiguration,
  securityCodeSecurityCreateConfiguration,
  securityCodeSecurityCreateConfigurationForEnterprise,
  securityCodeSecurityDeleteConfiguration,
  securityCodeSecurityDeleteConfigurationForEnterprise,
  securityCodeSecurityDetachConfiguration,
  securityCodeSecurityGetConfiguration,
  securityCodeSecurityGetConfigurationForRepository,
  securityCodeSecurityGetConfigurationsForEnterprise,
  securityCodeSecurityGetConfigurationsForOrg,
  securityCodeSecurityGetDefaultConfigurations,
  securityCodeSecurityGetDefaultConfigurationsForEnterprise,
  securityCodeSecurityGetRepositoriesForConfiguration,
  securityCodeSecurityGetRepositoriesForEnterpriseConfiguration,
  securityCodeSecurityGetSingleConfigurationForEnterprise,
  securityCodeSecuritySetConfigurationAsDefault,
  securityCodeSecuritySetConfigurationAsDefaultForEnterprise,
  securityCodeSecurityUpdateConfiguration,
  securityCodeSecurityUpdateEnterpriseConfiguration,
];
