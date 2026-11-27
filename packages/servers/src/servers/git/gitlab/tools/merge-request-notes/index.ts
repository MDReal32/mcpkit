import { addMergeRequestDiscussionNote } from "./add-merge-request-discussion-note";
import { createMergeRequestDiscussion } from "./create-merge-request-discussion";
import { createMergeRequestNote } from "./create-merge-request-note";
import { deleteMergeRequestDiscussionNote } from "./delete-merge-request-discussion-note";
import { deleteMergeRequestNote } from "./delete-merge-request-note";
import { getMergeRequestDiscussion } from "./get-merge-request-discussion";
import { getMergeRequestNote } from "./get-merge-request-note";
import { listMergeRequestDiscussions } from "./list-merge-request-discussions";
import { listMergeRequestNotes } from "./list-merge-request-notes";
import { resolveMergeRequestDiscussion } from "./resolve-merge-request-discussion";
import { updateMergeRequestDiscussionNote } from "./update-merge-request-discussion-note";
import { updateMergeRequestNote } from "./update-merge-request-note";

export const MERGE_REQUEST_NOTE_TOOLS = [
  listMergeRequestNotes,
  createMergeRequestNote,
  getMergeRequestNote,
  updateMergeRequestNote,
  deleteMergeRequestNote,
  listMergeRequestDiscussions,
  createMergeRequestDiscussion,
  getMergeRequestDiscussion,
  resolveMergeRequestDiscussion,
  addMergeRequestDiscussionNote,
  updateMergeRequestDiscussionNote,
  deleteMergeRequestDiscussionNote,
];
