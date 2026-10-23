import { addMergeRequestComment } from './add-comment';
import { getMergeRequest } from './get';
import { listMergeRequests } from './list';

export const mergeRequestTools = [addMergeRequestComment, getMergeRequest, listMergeRequests];
