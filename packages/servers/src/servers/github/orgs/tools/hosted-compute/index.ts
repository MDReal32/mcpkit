import { hostedComputeCreateNetworkConfigurationForOrg } from './create-network-configuration-for-org';
import { hostedComputeDeleteNetworkConfigurationFromOrg } from './delete-network-configuration-from-org';
import { hostedComputeGetNetworkConfigurationForOrg } from './get-network-configuration-for-org';
import { hostedComputeGetNetworkSettingsForOrg } from './get-network-settings-for-org';
import { hostedComputeListNetworkConfigurationsForOrg } from './list-network-configurations-for-org';
import { hostedComputeUpdateNetworkConfigurationForOrg } from './update-network-configuration-for-org';

export const hostedComputeTools = [
  hostedComputeCreateNetworkConfigurationForOrg,
  hostedComputeDeleteNetworkConfigurationFromOrg,
  hostedComputeGetNetworkConfigurationForOrg,
  hostedComputeGetNetworkSettingsForOrg,
  hostedComputeListNetworkConfigurationsForOrg,
  hostedComputeUpdateNetworkConfigurationForOrg,
];
