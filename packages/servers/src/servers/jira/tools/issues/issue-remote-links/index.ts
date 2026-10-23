import { issuesIssueRemoteLinksCreateOrUpdateRemoteIssueLink } from "./create-or-update-remote-issue-link";
import { issuesIssueRemoteLinksDeleteRemoteIssueLinkByGlobalId } from "./delete-remote-issue-link-by-global-id";
import { issuesIssueRemoteLinksDeleteRemoteIssueLinkById } from "./delete-remote-issue-link-by-id";
import { issuesIssueRemoteLinksGetRemoteIssueLinkById } from "./get-remote-issue-link-by-id";
import { issuesIssueRemoteLinksGetRemoteIssueLinks } from "./get-remote-issue-links";
import { issuesIssueRemoteLinksUpdateRemoteIssueLink } from "./update-remote-issue-link";

export const issuesIssueRemoteLinksTools = [
  issuesIssueRemoteLinksCreateOrUpdateRemoteIssueLink,
  issuesIssueRemoteLinksDeleteRemoteIssueLinkByGlobalId,
  issuesIssueRemoteLinksDeleteRemoteIssueLinkById,
  issuesIssueRemoteLinksGetRemoteIssueLinkById,
  issuesIssueRemoteLinksGetRemoteIssueLinks,
  issuesIssueRemoteLinksUpdateRemoteIssueLink,
];
