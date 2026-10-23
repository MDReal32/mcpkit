import { metaFeaturesCreateFeatures } from "./create-features";
import { metaFeaturesDeleteFeatures } from "./delete-features";
import { metaFeaturesListFeatures } from "./list-features";
import { metaFeaturesListFeaturesDefinitions } from "./list-features-definitions";

export const metaFeaturesTools = [
  metaFeaturesCreateFeatures,
  metaFeaturesDeleteFeatures,
  metaFeaturesListFeatures,
  metaFeaturesListFeaturesDefinitions,
];
