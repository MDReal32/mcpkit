import { securityGroupCredentialsInventoryCreateGroupsManagePersonalAccessTokensRotate } from './create-groups-manage-personal-access-tokens-rotate';
import { securityGroupCredentialsInventoryCreateGroupsManageResourceAccessTokensRotate } from './create-groups-manage-resource-access-tokens-rotate';
import { securityGroupCredentialsInventoryDeleteGroupsManagePersonalAccessTokens } from './delete-groups-manage-personal-access-tokens';
import { securityGroupCredentialsInventoryDeleteGroupsManageResourceAccessTokens } from './delete-groups-manage-resource-access-tokens';
import { securityGroupCredentialsInventoryDeleteGroupsManageSshKeys } from './delete-groups-manage-ssh-keys';
import { securityGroupCredentialsInventoryListGroupsManagePersonalAccessTokens } from './list-groups-manage-personal-access-tokens';
import { securityGroupCredentialsInventoryListGroupsManageResourceAccessTokens } from './list-groups-manage-resource-access-tokens';
import { securityGroupCredentialsInventoryListGroupsManageSshKeys } from './list-groups-manage-ssh-keys';

export const securityGroupCredentialsInventoryTools = [
  securityGroupCredentialsInventoryCreateGroupsManagePersonalAccessTokensRotate,
  securityGroupCredentialsInventoryCreateGroupsManageResourceAccessTokensRotate,
  securityGroupCredentialsInventoryDeleteGroupsManagePersonalAccessTokens,
  securityGroupCredentialsInventoryDeleteGroupsManageResourceAccessTokens,
  securityGroupCredentialsInventoryDeleteGroupsManageSshKeys,
  securityGroupCredentialsInventoryListGroupsManagePersonalAccessTokens,
  securityGroupCredentialsInventoryListGroupsManageResourceAccessTokens,
  securityGroupCredentialsInventoryListGroupsManageSshKeys,
];
