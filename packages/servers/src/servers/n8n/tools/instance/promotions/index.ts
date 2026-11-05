import { instancePromotionsAddProjectToPromotionEnvironment } from "./add-project-to-promotion-environment";
import { instancePromotionsApplyPackage } from "./apply-package";
import { instancePromotionsApplyProjectSelection } from "./apply-project-selection";
import { instancePromotionsConnectPromotionCheckout } from "./connect-promotion-checkout";
import { instancePromotionsContinueApplyPackage } from "./continue-apply-package";
import { instancePromotionsContinueApplyProjectSelection } from "./continue-apply-project-selection";
import { instancePromotionsCreatePromotionEnvironment } from "./create-promotion-environment";
import { instancePromotionsCreatePromotionProvider } from "./create-promotion-provider";
import { instancePromotionsDeletePromotionEnvironment } from "./delete-promotion-environment";
import { instancePromotionsDeletePromotionProvider } from "./delete-promotion-provider";
import { instancePromotionsDisconnectPromotionCheckout } from "./disconnect-promotion-checkout";
import { instancePromotionsGetPromotionChanges } from "./get-promotion-changes";
import { instancePromotionsGetPromotionEnvironment } from "./get-promotion-environment";
import { instancePromotionsGetPromotionEnvironmentProjects } from "./get-promotion-environment-projects";
import { instancePromotionsGetPromotionEnvironments } from "./get-promotion-environments";
import { instancePromotionsGetPromotionProvider } from "./get-promotion-provider";
import { instancePromotionsGetPromotionProviderRepositories } from "./get-promotion-provider-repositories";
import { instancePromotionsGetPromotionProviderRepositoryBranches } from "./get-promotion-provider-repository-branches";
import { instancePromotionsGetPromotionProviders } from "./get-promotion-providers";
import { instancePromotionsPromotePackage } from "./promote-package";
import { instancePromotionsPromoteProjectSelection } from "./promote-project-selection";
import { instancePromotionsRemoveProjectFromPromotionEnvironment } from "./remove-project-from-promotion-environment";
import { instancePromotionsUpdatePromotionEnvironment } from "./update-promotion-environment";
import { instancePromotionsUpdatePromotionProvider } from "./update-promotion-provider";

export const instancePromotionsTools = [
  instancePromotionsAddProjectToPromotionEnvironment,
  instancePromotionsApplyPackage,
  instancePromotionsApplyProjectSelection,
  instancePromotionsConnectPromotionCheckout,
  instancePromotionsContinueApplyPackage,
  instancePromotionsContinueApplyProjectSelection,
  instancePromotionsCreatePromotionEnvironment,
  instancePromotionsCreatePromotionProvider,
  instancePromotionsDeletePromotionEnvironment,
  instancePromotionsDeletePromotionProvider,
  instancePromotionsDisconnectPromotionCheckout,
  instancePromotionsGetPromotionChanges,
  instancePromotionsGetPromotionEnvironment,
  instancePromotionsGetPromotionEnvironmentProjects,
  instancePromotionsGetPromotionEnvironments,
  instancePromotionsGetPromotionProvider,
  instancePromotionsGetPromotionProviderRepositories,
  instancePromotionsGetPromotionProviderRepositoryBranches,
  instancePromotionsGetPromotionProviders,
  instancePromotionsPromotePackage,
  instancePromotionsPromoteProjectSelection,
  instancePromotionsRemoveProjectFromPromotionEnvironment,
  instancePromotionsUpdatePromotionEnvironment,
  instancePromotionsUpdatePromotionProvider,
];
