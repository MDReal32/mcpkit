import { issuesIssueAttachmentsExpandAttachmentForHumans } from './expand-attachment-for-humans';
import { issuesIssueAttachmentsExpandAttachmentForMachines } from './expand-attachment-for-machines';
import { issuesIssueAttachmentsGetAttachment } from './get-attachment';
import { issuesIssueAttachmentsGetAttachmentContent } from './get-attachment-content';
import { issuesIssueAttachmentsGetAttachmentMeta } from './get-attachment-meta';
import { issuesIssueAttachmentsGetAttachmentThumbnail } from './get-attachment-thumbnail';
import { issuesIssueAttachmentsRemoveAttachment } from './remove-attachment';

export const issuesIssueAttachmentsTools = [
  issuesIssueAttachmentsExpandAttachmentForHumans,
  issuesIssueAttachmentsExpandAttachmentForMachines,
  issuesIssueAttachmentsGetAttachment,
  issuesIssueAttachmentsGetAttachmentContent,
  issuesIssueAttachmentsGetAttachmentMeta,
  issuesIssueAttachmentsGetAttachmentThumbnail,
  issuesIssueAttachmentsRemoveAttachment,
];
