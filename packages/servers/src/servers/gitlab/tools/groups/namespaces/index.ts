import { groupsNamespacesCreateNamespacesStorageLimitExclusion } from './create-namespaces-storage-limit-exclusion';
import { groupsNamespacesDeleteNamespacesStorageLimitExclusion } from './delete-namespaces-storage-limit-exclusion';
import { groupsNamespacesGetNamespaces } from './get-namespaces';
import { groupsNamespacesGetNamespacesExists } from './get-namespaces-exists';
import { groupsNamespacesGetNamespacesGitlabSubscription } from './get-namespaces-gitlab-subscription';
import { groupsNamespacesGetNamespacesStorageLimitExclusions } from './get-namespaces-storage-limit-exclusions';
import { groupsNamespacesListNamespaces } from './list-namespaces';
import { groupsNamespacesUpdateNamespaces } from './update-namespaces';

export const groupsNamespacesTools = [
  groupsNamespacesCreateNamespacesStorageLimitExclusion,
  groupsNamespacesDeleteNamespacesStorageLimitExclusion,
  groupsNamespacesGetNamespaces,
  groupsNamespacesGetNamespacesExists,
  groupsNamespacesGetNamespacesGitlabSubscription,
  groupsNamespacesGetNamespacesStorageLimitExclusions,
  groupsNamespacesListNamespaces,
  groupsNamespacesUpdateNamespaces,
];
