import { projectsProjectVersionsCreateRelatedWork } from './create-related-work';
import { projectsProjectVersionsCreateVersion } from './create-version';
import { projectsProjectVersionsDeleteAndReplaceVersion } from './delete-and-replace-version';
import { projectsProjectVersionsDeleteRelatedWork } from './delete-related-work';
import { projectsProjectVersionsDeleteVersion } from './delete-version';
import { projectsProjectVersionsGetProjectVersions } from './get-project-versions';
import { projectsProjectVersionsGetProjectVersionsPaginated } from './get-project-versions-paginated';
import { projectsProjectVersionsGetRelatedWork } from './get-related-work';
import { projectsProjectVersionsGetVersion } from './get-version';
import { projectsProjectVersionsGetVersionRelatedIssues } from './get-version-related-issues';
import { projectsProjectVersionsGetVersionUnresolvedIssues } from './get-version-unresolved-issues';
import { projectsProjectVersionsMergeVersions } from './merge-versions';
import { projectsProjectVersionsMoveVersion } from './move-version';
import { projectsProjectVersionsUpdateRelatedWork } from './update-related-work';
import { projectsProjectVersionsUpdateVersion } from './update-version';

export const projectsProjectVersionsTools = [
  projectsProjectVersionsCreateRelatedWork,
  projectsProjectVersionsCreateVersion,
  projectsProjectVersionsDeleteAndReplaceVersion,
  projectsProjectVersionsDeleteRelatedWork,
  projectsProjectVersionsDeleteVersion,
  projectsProjectVersionsGetProjectVersions,
  projectsProjectVersionsGetProjectVersionsPaginated,
  projectsProjectVersionsGetRelatedWork,
  projectsProjectVersionsGetVersion,
  projectsProjectVersionsGetVersionRelatedIssues,
  projectsProjectVersionsGetVersionUnresolvedIssues,
  projectsProjectVersionsMergeVersions,
  projectsProjectVersionsMoveVersion,
  projectsProjectVersionsUpdateRelatedWork,
  projectsProjectVersionsUpdateVersion,
];
