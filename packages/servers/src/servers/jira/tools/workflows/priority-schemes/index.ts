import { workflowsPrioritySchemesCreatePriorityScheme } from "./create-priority-scheme";
import { workflowsPrioritySchemesDeletePriorityScheme } from "./delete-priority-scheme";
import { workflowsPrioritySchemesGetAvailablePrioritiesByPriorityScheme } from "./get-available-priorities-by-priority-scheme";
import { workflowsPrioritySchemesGetPrioritiesByPriorityScheme } from "./get-priorities-by-priority-scheme";
import { workflowsPrioritySchemesGetPrioritySchemes } from "./get-priority-schemes";
import { workflowsPrioritySchemesGetProjectsByPriorityScheme } from "./get-projects-by-priority-scheme";
import { workflowsPrioritySchemesSuggestedPrioritiesForMappings } from "./suggested-priorities-for-mappings";
import { workflowsPrioritySchemesUpdatePriorityScheme } from "./update-priority-scheme";

export const workflowsPrioritySchemesTools = [
  workflowsPrioritySchemesCreatePriorityScheme,
  workflowsPrioritySchemesDeletePriorityScheme,
  workflowsPrioritySchemesGetAvailablePrioritiesByPriorityScheme,
  workflowsPrioritySchemesGetPrioritiesByPriorityScheme,
  workflowsPrioritySchemesGetPrioritySchemes,
  workflowsPrioritySchemesGetProjectsByPriorityScheme,
  workflowsPrioritySchemesSuggestedPrioritiesForMappings,
  workflowsPrioritySchemesUpdatePriorityScheme,
];
