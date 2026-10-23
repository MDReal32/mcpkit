import { issuesJqlFunctionsAppsGetPrecomputations } from './get-precomputations';
import { issuesJqlFunctionsAppsGetPrecomputationsById } from './get-precomputations-by-id';
import { issuesJqlFunctionsAppsUpdatePrecomputations } from './update-precomputations';

export const issuesJqlFunctionsAppsTools = [
  issuesJqlFunctionsAppsGetPrecomputations,
  issuesJqlFunctionsAppsGetPrecomputationsById,
  issuesJqlFunctionsAppsUpdatePrecomputations,
];
