import { appsAppsAddRepoToInstallationForAuthenticatedUser } from './add-repo-to-installation-for-authenticated-user';
import { appsAppsCheckToken } from './check-token';
import { appsAppsCreateFromManifest } from './create-from-manifest';
import { appsAppsCreateInstallationAccessToken } from './create-installation-access-token';
import { appsAppsDeleteAuthorization } from './delete-authorization';
import { appsAppsDeleteInstallation } from './delete-installation';
import { appsAppsDeleteToken } from './delete-token';
import { appsAppsGetAuthenticated } from './get-authenticated';
import { appsAppsGetBySlug } from './get-by-slug';
import { appsAppsGetInstallation } from './get-installation';
import { appsAppsGetOrgInstallation } from './get-org-installation';
import { appsAppsGetRepoInstallation } from './get-repo-installation';
import { appsAppsGetSubscriptionPlanForAccount } from './get-subscription-plan-for-account';
import { appsAppsGetSubscriptionPlanForAccountStubbed } from './get-subscription-plan-for-account-stubbed';
import { appsAppsGetUserInstallation } from './get-user-installation';
import { appsAppsGetWebhookConfigForApp } from './get-webhook-config-for-app';
import { appsAppsGetWebhookDelivery } from './get-webhook-delivery';
import { appsAppsListAccountsForPlan } from './list-accounts-for-plan';
import { appsAppsListAccountsForPlanStubbed } from './list-accounts-for-plan-stubbed';
import { appsAppsListInstallationReposForAuthenticatedUser } from './list-installation-repos-for-authenticated-user';
import { appsAppsListInstallationRequestsForAuthenticatedApp } from './list-installation-requests-for-authenticated-app';
import { appsAppsListInstallations } from './list-installations';
import { appsAppsListInstallationsForAuthenticatedUser } from './list-installations-for-authenticated-user';
import { appsAppsListPlans } from './list-plans';
import { appsAppsListPlansStubbed } from './list-plans-stubbed';
import { appsAppsListReposAccessibleToInstallation } from './list-repos-accessible-to-installation';
import { appsAppsListSubscriptionsForAuthenticatedUser } from './list-subscriptions-for-authenticated-user';
import { appsAppsListSubscriptionsForAuthenticatedUserStubbed } from './list-subscriptions-for-authenticated-user-stubbed';
import { appsAppsListWebhookDeliveries } from './list-webhook-deliveries';
import { appsAppsRedeliverWebhookDelivery } from './redeliver-webhook-delivery';
import { appsAppsRemoveRepoFromInstallationForAuthenticatedUser } from './remove-repo-from-installation-for-authenticated-user';
import { appsAppsResetToken } from './reset-token';
import { appsAppsRevokeInstallationAccessToken } from './revoke-installation-access-token';
import { appsAppsScopeToken } from './scope-token';
import { appsAppsSuspendInstallation } from './suspend-installation';
import { appsAppsUnsuspendInstallation } from './unsuspend-installation';
import { appsAppsUpdateWebhookConfigForApp } from './update-webhook-config-for-app';

export const appsAppsTools = [
  appsAppsAddRepoToInstallationForAuthenticatedUser,
  appsAppsCheckToken,
  appsAppsCreateFromManifest,
  appsAppsCreateInstallationAccessToken,
  appsAppsDeleteAuthorization,
  appsAppsDeleteInstallation,
  appsAppsDeleteToken,
  appsAppsGetAuthenticated,
  appsAppsGetBySlug,
  appsAppsGetInstallation,
  appsAppsGetOrgInstallation,
  appsAppsGetRepoInstallation,
  appsAppsGetSubscriptionPlanForAccount,
  appsAppsGetSubscriptionPlanForAccountStubbed,
  appsAppsGetUserInstallation,
  appsAppsGetWebhookConfigForApp,
  appsAppsGetWebhookDelivery,
  appsAppsListAccountsForPlan,
  appsAppsListAccountsForPlanStubbed,
  appsAppsListInstallationReposForAuthenticatedUser,
  appsAppsListInstallationRequestsForAuthenticatedApp,
  appsAppsListInstallations,
  appsAppsListInstallationsForAuthenticatedUser,
  appsAppsListPlans,
  appsAppsListPlansStubbed,
  appsAppsListReposAccessibleToInstallation,
  appsAppsListSubscriptionsForAuthenticatedUser,
  appsAppsListSubscriptionsForAuthenticatedUserStubbed,
  appsAppsListWebhookDeliveries,
  appsAppsRedeliverWebhookDelivery,
  appsAppsRemoveRepoFromInstallationForAuthenticatedUser,
  appsAppsResetToken,
  appsAppsRevokeInstallationAccessToken,
  appsAppsScopeToken,
  appsAppsSuspendInstallation,
  appsAppsUnsuspendInstallation,
  appsAppsUpdateWebhookConfigForApp,
];
