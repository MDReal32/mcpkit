import { codeSecurityAttachConfiguration } from './attach-configuration';
import { codeSecurityAttachEnterpriseConfiguration } from './attach-enterprise-configuration';
import { codeSecurityCreateConfiguration } from './create-configuration';
import { codeSecurityCreateConfigurationForEnterprise } from './create-configuration-for-enterprise';
import { codeSecurityDeleteConfiguration } from './delete-configuration';
import { codeSecurityDeleteConfigurationForEnterprise } from './delete-configuration-for-enterprise';
import { codeSecurityDetachConfiguration } from './detach-configuration';
import { codeSecurityGetConfiguration } from './get-configuration';
import { codeSecurityGetConfigurationForRepository } from './get-configuration-for-repository';
import { codeSecurityGetConfigurationsForEnterprise } from './get-configurations-for-enterprise';
import { codeSecurityGetConfigurationsForOrg } from './get-configurations-for-org';
import { codeSecurityGetDefaultConfigurations } from './get-default-configurations';
import { codeSecurityGetDefaultConfigurationsForEnterprise } from './get-default-configurations-for-enterprise';
import { codeSecurityGetRepositoriesForConfiguration } from './get-repositories-for-configuration';
import { codeSecurityGetRepositoriesForEnterpriseConfiguration } from './get-repositories-for-enterprise-configuration';
import { codeSecurityGetSingleConfigurationForEnterprise } from './get-single-configuration-for-enterprise';
import { codeSecuritySetConfigurationAsDefault } from './set-configuration-as-default';
import { codeSecuritySetConfigurationAsDefaultForEnterprise } from './set-configuration-as-default-for-enterprise';
import { codeSecurityUpdateConfiguration } from './update-configuration';
import { codeSecurityUpdateEnterpriseConfiguration } from './update-enterprise-configuration';

export const codeSecurityTools = [
  codeSecurityAttachConfiguration,
  codeSecurityAttachEnterpriseConfiguration,
  codeSecurityCreateConfiguration,
  codeSecurityCreateConfigurationForEnterprise,
  codeSecurityDeleteConfiguration,
  codeSecurityDeleteConfigurationForEnterprise,
  codeSecurityDetachConfiguration,
  codeSecurityGetConfiguration,
  codeSecurityGetConfigurationForRepository,
  codeSecurityGetConfigurationsForEnterprise,
  codeSecurityGetConfigurationsForOrg,
  codeSecurityGetDefaultConfigurations,
  codeSecurityGetDefaultConfigurationsForEnterprise,
  codeSecurityGetRepositoriesForConfiguration,
  codeSecurityGetRepositoriesForEnterpriseConfiguration,
  codeSecurityGetSingleConfigurationForEnterprise,
  codeSecuritySetConfigurationAsDefault,
  codeSecuritySetConfigurationAsDefaultForEnterprise,
  codeSecurityUpdateConfiguration,
  codeSecurityUpdateEnterpriseConfiguration,
];
