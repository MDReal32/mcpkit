import { cloudInlineCommentsCreateInlineComment } from "./create-inline-comment";
import { cloudInlineCommentsDeleteInlineComment } from "./delete-inline-comment";
import { cloudInlineCommentsGetInlineCommentById } from "./get-inline-comment-by-id";
import { cloudInlineCommentsGetInlineCommentChildren } from "./get-inline-comment-children";
import { cloudInlineCommentsGetInlineCommentOperations } from "./get-inline-comment-operations";
import { cloudInlineCommentsGetInlineCommentVersionDetails } from "./get-inline-comment-version-details";
import { cloudInlineCommentsGetInlineCommentVersions } from "./get-inline-comment-versions";
import { cloudInlineCommentsGetInlineComments } from "./get-inline-comments";
import { cloudInlineCommentsGetInlineLikeCount } from "./get-inline-like-count";
import { cloudInlineCommentsGetInlineLikeUsers } from "./get-inline-like-users";
import { cloudInlineCommentsUpdateInlineComment } from "./update-inline-comment";

export const cloudInlineCommentsTools = [
  cloudInlineCommentsCreateInlineComment,
  cloudInlineCommentsDeleteInlineComment,
  cloudInlineCommentsGetInlineCommentById,
  cloudInlineCommentsGetInlineCommentChildren,
  cloudInlineCommentsGetInlineCommentOperations,
  cloudInlineCommentsGetInlineCommentVersionDetails,
  cloudInlineCommentsGetInlineCommentVersions,
  cloudInlineCommentsGetInlineComments,
  cloudInlineCommentsGetInlineLikeCount,
  cloudInlineCommentsGetInlineLikeUsers,
  cloudInlineCommentsUpdateInlineComment,
];
