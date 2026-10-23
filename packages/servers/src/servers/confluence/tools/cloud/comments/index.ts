import { cloudCommentsCreateCommentProperty } from './create-comment-property';
import { cloudCommentsDeleteCommentPropertyById } from './delete-comment-property-by-id';
import { cloudCommentsGetCommentContentProperties } from './get-comment-content-properties';
import { cloudCommentsGetCommentContentPropertiesById } from './get-comment-content-properties-by-id';
import { cloudCommentsUpdateCommentPropertyById } from './update-comment-property-by-id';

export const cloudCommentsTools = [
  cloudCommentsCreateCommentProperty,
  cloudCommentsDeleteCommentPropertyById,
  cloudCommentsGetCommentContentProperties,
  cloudCommentsGetCommentContentPropertiesById,
  cloudCommentsUpdateCommentPropertyById,
];
