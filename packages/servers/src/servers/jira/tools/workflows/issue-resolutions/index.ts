import { workflowsIssueResolutionsCreateResolution } from "./create-resolution";
import { workflowsIssueResolutionsDeleteResolution } from "./delete-resolution";
import { workflowsIssueResolutionsGetResolution } from "./get-resolution";
import { workflowsIssueResolutionsGetResolutions } from "./get-resolutions";
import { workflowsIssueResolutionsMoveResolutions } from "./move-resolutions";
import { workflowsIssueResolutionsSearchResolutions } from "./search-resolutions";
import { workflowsIssueResolutionsSetDefaultResolution } from "./set-default-resolution";
import { workflowsIssueResolutionsUpdateResolution } from "./update-resolution";

export const workflowsIssueResolutionsTools = [
  workflowsIssueResolutionsCreateResolution,
  workflowsIssueResolutionsDeleteResolution,
  workflowsIssueResolutionsGetResolution,
  workflowsIssueResolutionsGetResolutions,
  workflowsIssueResolutionsMoveResolutions,
  workflowsIssueResolutionsSearchResolutions,
  workflowsIssueResolutionsSetDefaultResolution,
  workflowsIssueResolutionsUpdateResolution,
];
