import { ciUnleashCreateFeatureFlagsUnleashClientMetrics } from "./create-feature-flags-unleash-client-metrics";
import { ciUnleashCreateFeatureFlagsUnleashClientRegister } from "./create-feature-flags-unleash-client-register";
import { ciUnleashGetFeatureFlagsUnleash } from "./get-feature-flags-unleash";
import { ciUnleashListFeatureFlagsUnleashClientFeatures } from "./list-feature-flags-unleash-client-features";
import { ciUnleashListFeatureFlagsUnleashFeatures } from "./list-feature-flags-unleash-features";

export const ciUnleashTools = [
  ciUnleashCreateFeatureFlagsUnleashClientMetrics,
  ciUnleashCreateFeatureFlagsUnleashClientRegister,
  ciUnleashGetFeatureFlagsUnleash,
  ciUnleashListFeatureFlagsUnleashClientFeatures,
  ciUnleashListFeatureFlagsUnleashFeatures,
];
