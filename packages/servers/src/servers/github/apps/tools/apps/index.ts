import { appsAddRepoToInstallationForAuthenticatedUser } from './add-repo-to-installation-for-authenticated-user';
import { appsCheckToken } from './check-token';
import { appsCreateFromManifest } from './create-from-manifest';
import { appsCreateInstallationAccessToken } from './create-installation-access-token';
import { appsDeleteAuthorization } from './delete-authorization';
import { appsDeleteInstallation } from './delete-installation';
import { appsDeleteToken } from './delete-token';
import { appsGetAuthenticated } from './get-authenticated';
import { appsGetBySlug } from './get-by-slug';
import { appsGetInstallation } from './get-installation';
import { appsGetOrgInstallation } from './get-org-installation';
import { appsGetRepoInstallation } from './get-repo-installation';
import { appsGetSubscriptionPlanForAccount } from './get-subscription-plan-for-account';
import { appsGetSubscriptionPlanForAccountStubbed } from './get-subscription-plan-for-account-stubbed';
import { appsGetUserInstallation } from './get-user-installation';
import { appsGetWebhookConfigForApp } from './get-webhook-config-for-app';
import { appsGetWebhookDelivery } from './get-webhook-delivery';
import { appsListAccountsForPlan } from './list-accounts-for-plan';
import { appsListAccountsForPlanStubbed } from './list-accounts-for-plan-stubbed';
import { appsListInstallationReposForAuthenticatedUser } from './list-installation-repos-for-authenticated-user';
import { appsListInstallationRequestsForAuthenticatedApp } from './list-installation-requests-for-authenticated-app';
import { appsListInstallations } from './list-installations';
import { appsListInstallationsForAuthenticatedUser } from './list-installations-for-authenticated-user';
import { appsListPlans } from './list-plans';
import { appsListPlansStubbed } from './list-plans-stubbed';
import { appsListReposAccessibleToInstallation } from './list-repos-accessible-to-installation';
import { appsListSubscriptionsForAuthenticatedUser } from './list-subscriptions-for-authenticated-user';
import { appsListSubscriptionsForAuthenticatedUserStubbed } from './list-subscriptions-for-authenticated-user-stubbed';
import { appsListWebhookDeliveries } from './list-webhook-deliveries';
import { appsRedeliverWebhookDelivery } from './redeliver-webhook-delivery';
import { appsRemoveRepoFromInstallationForAuthenticatedUser } from './remove-repo-from-installation-for-authenticated-user';
import { appsResetToken } from './reset-token';
import { appsRevokeInstallationAccessToken } from './revoke-installation-access-token';
import { appsScopeToken } from './scope-token';
import { appsSuspendInstallation } from './suspend-installation';
import { appsUnsuspendInstallation } from './unsuspend-installation';
import { appsUpdateWebhookConfigForApp } from './update-webhook-config-for-app';

export const appsTools = [
  appsAddRepoToInstallationForAuthenticatedUser,
  appsCheckToken,
  appsCreateFromManifest,
  appsCreateInstallationAccessToken,
  appsDeleteAuthorization,
  appsDeleteInstallation,
  appsDeleteToken,
  appsGetAuthenticated,
  appsGetBySlug,
  appsGetInstallation,
  appsGetOrgInstallation,
  appsGetRepoInstallation,
  appsGetSubscriptionPlanForAccount,
  appsGetSubscriptionPlanForAccountStubbed,
  appsGetUserInstallation,
  appsGetWebhookConfigForApp,
  appsGetWebhookDelivery,
  appsListAccountsForPlan,
  appsListAccountsForPlanStubbed,
  appsListInstallationReposForAuthenticatedUser,
  appsListInstallationRequestsForAuthenticatedApp,
  appsListInstallations,
  appsListInstallationsForAuthenticatedUser,
  appsListPlans,
  appsListPlansStubbed,
  appsListReposAccessibleToInstallation,
  appsListSubscriptionsForAuthenticatedUser,
  appsListSubscriptionsForAuthenticatedUserStubbed,
  appsListWebhookDeliveries,
  appsRedeliverWebhookDelivery,
  appsRemoveRepoFromInstallationForAuthenticatedUser,
  appsResetToken,
  appsRevokeInstallationAccessToken,
  appsScopeToken,
  appsSuspendInstallation,
  appsUnsuspendInstallation,
  appsUpdateWebhookConfigForApp,
];
