import { gistsCheckIsStarred } from './check-is-starred';
import { gistsCreate } from './create';
import { gistsCreateComment } from './create-comment';
import { gistsDelete } from './delete';
import { gistsDeleteComment } from './delete-comment';
import { gistsFork } from './fork';
import { gistsGet } from './get';
import { gistsGetComment } from './get-comment';
import { gistsGetRevision } from './get-revision';
import { gistsList } from './list';
import { gistsListComments } from './list-comments';
import { gistsListCommits } from './list-commits';
import { gistsListForUser } from './list-for-user';
import { gistsListForks } from './list-forks';
import { gistsListPublic } from './list-public';
import { gistsListStarred } from './list-starred';
import { gistsStar } from './star';
import { gistsUnstar } from './unstar';
import { gistsUpdate } from './update';
import { gistsUpdateComment } from './update-comment';

export const gistsTools = [
  gistsCheckIsStarred,
  gistsCreate,
  gistsCreateComment,
  gistsDelete,
  gistsDeleteComment,
  gistsFork,
  gistsGet,
  gistsGetComment,
  gistsGetRevision,
  gistsList,
  gistsListComments,
  gistsListCommits,
  gistsListForUser,
  gistsListForks,
  gistsListPublic,
  gistsListStarred,
  gistsStar,
  gistsUnstar,
  gistsUpdate,
  gistsUpdateComment,
];
