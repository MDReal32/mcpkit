import { cloudAdminKeyTools } from './admin-key';
import { cloudAppTools } from './app';
import { cloudAttachmentsTools } from './attachments';
import { cloudBlogpostsTools } from './blogposts';
import { cloudClassificationLevelsTools } from './classification-levels';
import { cloudCommentsTools } from './comments';
import { cloudContentTools } from './content';
import { cloudCustomContentTools } from './custom-content';
import { cloudDataPoliciesTools } from './data-policies';
import { cloudDatabasesTools } from './databases';
import { cloudEmbedsTools } from './embeds';
import { cloudFoldersTools } from './folders';
import { cloudFooterCommentsTools } from './footer-comments';
import { cloudInlineCommentsTools } from './inline-comments';
import { cloudLabelsTools } from './labels';
import { cloudPagesTools } from './pages';
import { cloudSpacePermissionsTools } from './space-permissions';
import { cloudSpaceRoleModeTools } from './space-role-mode';
import { cloudSpaceRolesTools } from './space-roles';
import { cloudSpacesTools } from './spaces';
import { cloudTasksTools } from './tasks';
import { cloudUserTools } from './user';
import { cloudUsersBulkTools } from './users-bulk';
import { cloudWhiteboardsTools } from './whiteboards';

export const cloudAllTools = [
  ...cloudAdminKeyTools,
  ...cloudAppTools,
  ...cloudAttachmentsTools,
  ...cloudBlogpostsTools,
  ...cloudClassificationLevelsTools,
  ...cloudCommentsTools,
  ...cloudContentTools,
  ...cloudCustomContentTools,
  ...cloudDataPoliciesTools,
  ...cloudDatabasesTools,
  ...cloudEmbedsTools,
  ...cloudFoldersTools,
  ...cloudFooterCommentsTools,
  ...cloudInlineCommentsTools,
  ...cloudLabelsTools,
  ...cloudPagesTools,
  ...cloudSpacePermissionsTools,
  ...cloudSpaceRoleModeTools,
  ...cloudSpaceRolesTools,
  ...cloudSpacesTools,
  ...cloudTasksTools,
  ...cloudUserTools,
  ...cloudUsersBulkTools,
  ...cloudWhiteboardsTools,
];
