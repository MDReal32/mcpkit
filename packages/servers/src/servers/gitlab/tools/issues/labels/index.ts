import { issuesLabelsCreateGroupsLabels } from './create-groups-labels';
import { issuesLabelsCreateProjectsLabels } from './create-projects-labels';
import { issuesLabelsDeleteGroupsLabels } from './delete-groups-labels';
import { issuesLabelsDeleteGroupsLabelsDelete } from './delete-groups-labels-delete';
import { issuesLabelsDeleteProjectsLabels } from './delete-projects-labels';
import { issuesLabelsDeleteProjectsLabelsDelete } from './delete-projects-labels-delete';
import { issuesLabelsGetGroupsLabels } from './get-groups-labels';
import { issuesLabelsGetProjectsLabels } from './get-projects-labels';
import { issuesLabelsListGroupsLabels } from './list-groups-labels';
import { issuesLabelsListProjectsLabels } from './list-projects-labels';
import { issuesLabelsUpdateGroupsLabels } from './update-groups-labels';
import { issuesLabelsUpdateGroupsLabelsPut } from './update-groups-labels-put';
import { issuesLabelsUpdateProjectsLabels } from './update-projects-labels';
import { issuesLabelsUpdateProjectsLabelsPromote } from './update-projects-labels-promote';
import { issuesLabelsUpdateProjectsLabelsPromotePut } from './update-projects-labels-promote-put';
import { issuesLabelsUpdateProjectsLabelsPut } from './update-projects-labels-put';

export const issuesLabelsTools = [
  issuesLabelsCreateGroupsLabels,
  issuesLabelsCreateProjectsLabels,
  issuesLabelsDeleteGroupsLabels,
  issuesLabelsDeleteGroupsLabelsDelete,
  issuesLabelsDeleteProjectsLabels,
  issuesLabelsDeleteProjectsLabelsDelete,
  issuesLabelsGetGroupsLabels,
  issuesLabelsGetProjectsLabels,
  issuesLabelsListGroupsLabels,
  issuesLabelsListProjectsLabels,
  issuesLabelsUpdateGroupsLabels,
  issuesLabelsUpdateGroupsLabelsPut,
  issuesLabelsUpdateProjectsLabels,
  issuesLabelsUpdateProjectsLabelsPromote,
  issuesLabelsUpdateProjectsLabelsPromotePut,
  issuesLabelsUpdateProjectsLabelsPut,
];
