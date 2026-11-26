import { addAttachments } from "./add-attachments";
import { addComment } from "./add-comment";
import { addWorklog } from "./add-worklog";
import { assign } from "./assign";
import { createIssue } from "./create-issue";
import { doTransition } from "./do-transition";
import { editIssue } from "./edit-issue";
import { findUsers } from "./find-users";
import { getAttachment } from "./get-attachment";
import { getBoardSprints } from "./get-board-sprints";
import { getBoards } from "./get-boards";
import { getComments } from "./get-comments";
import { getFields } from "./get-fields";
import { getIssue } from "./get-issue";
import { getMyself } from "./get-myself";
import { getProject } from "./get-project";
import { getProjects } from "./get-projects";
import { getServerInfo } from "./get-server-info";
import { getSprintIssues } from "./get-sprint-issues";
import { getTransitions } from "./get-transitions";
import { getWorklogs } from "./get-worklogs";
import { linkIssues } from "./link-issues";
import { search } from "./search";
import { searchUsingPost } from "./search-using-post";
import { updateComment } from "./update-comment";

/** Jira Data Center 9.x, which Atlassian publishes no OpenAPI document for: its core endpoints, by hand. */
export const DATA_CENTER_9_TOOLS = [
  getIssue,
  createIssue,
  editIssue,
  search,
  searchUsingPost,
  getComments,
  addComment,
  updateComment,
  getTransitions,
  doTransition,
  assign,
  getAttachment,
  addAttachments,
  getWorklogs,
  addWorklog,
  linkIssues,
  getFields,
  getProjects,
  getProject,
  getMyself,
  findUsers,
  getServerInfo,
  getBoards,
  getBoardSprints,
  getSprintIssues,
];
