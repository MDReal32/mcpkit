import { issuesDraftNotesCreateProjectsMergeRequestsDraftNotes } from './create-projects-merge-requests-draft-notes';
import { issuesDraftNotesCreateProjectsMergeRequestsDraftNotesBulkPublish } from './create-projects-merge-requests-draft-notes-bulk-publish';
import { issuesDraftNotesDeleteProjectsMergeRequestsDraftNotes } from './delete-projects-merge-requests-draft-notes';
import { issuesDraftNotesGetProjectsMergeRequestsDraftNotes } from './get-projects-merge-requests-draft-notes';
import { issuesDraftNotesListProjectsMergeRequestsDraftNotes } from './list-projects-merge-requests-draft-notes';
import { issuesDraftNotesUpdateProjectsMergeRequestsDraftNotes } from './update-projects-merge-requests-draft-notes';
import { issuesDraftNotesUpdateProjectsMergeRequestsDraftNotesPublish } from './update-projects-merge-requests-draft-notes-publish';

export const issuesDraftNotesTools = [
  issuesDraftNotesCreateProjectsMergeRequestsDraftNotes,
  issuesDraftNotesCreateProjectsMergeRequestsDraftNotesBulkPublish,
  issuesDraftNotesDeleteProjectsMergeRequestsDraftNotes,
  issuesDraftNotesGetProjectsMergeRequestsDraftNotes,
  issuesDraftNotesListProjectsMergeRequestsDraftNotes,
  issuesDraftNotesUpdateProjectsMergeRequestsDraftNotes,
  issuesDraftNotesUpdateProjectsMergeRequestsDraftNotesPublish,
];
