import { tasksCommentsCreateChatViewComment } from "./create-chat-view-comment";
import { tasksCommentsCreateListComment } from "./create-list-comment";
import { tasksCommentsCreateTaskComment } from "./create-task-comment";
import { tasksCommentsCreateThreadedComment } from "./create-threaded-comment";
import { tasksCommentsDeleteComment } from "./delete-comment";
import { tasksCommentsGetChatViewComments } from "./get-chat-view-comments";
import { tasksCommentsGetListComments } from "./get-list-comments";
import { tasksCommentsGetPostSubtypeIds } from "./get-post-subtype-ids";
import { tasksCommentsGetTaskComments } from "./get-task-comments";
import { tasksCommentsGetThreadedComments } from "./get-threaded-comments";
import { tasksCommentsUpdateComment } from "./update-comment";

export const tasksCommentsTools = [
  tasksCommentsCreateChatViewComment,
  tasksCommentsCreateListComment,
  tasksCommentsCreateTaskComment,
  tasksCommentsCreateThreadedComment,
  tasksCommentsDeleteComment,
  tasksCommentsGetChatViewComments,
  tasksCommentsGetListComments,
  tasksCommentsGetPostSubtypeIds,
  tasksCommentsGetTaskComments,
  tasksCommentsGetThreadedComments,
  tasksCommentsUpdateComment,
];
