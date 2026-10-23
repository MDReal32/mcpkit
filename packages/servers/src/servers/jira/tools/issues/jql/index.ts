import { issuesJqlGetAuditEntries } from "./get-audit-entries";
import { issuesJqlGetAutoComplete } from "./get-auto-complete";
import { issuesJqlGetAutoCompletePost } from "./get-auto-complete-post";
import { issuesJqlGetFieldAutoCompleteForQueryString } from "./get-field-auto-complete-for-query-string";
import { issuesJqlMigrateQueries } from "./migrate-queries";
import { issuesJqlParseJqlQueries } from "./parse-jql-queries";
import { issuesJqlSanitiseJqlQueries } from "./sanitise-jql-queries";

export const issuesJqlTools = [
  issuesJqlGetAuditEntries,
  issuesJqlGetAutoComplete,
  issuesJqlGetAutoCompletePost,
  issuesJqlGetFieldAutoCompleteForQueryString,
  issuesJqlMigrateQueries,
  issuesJqlParseJqlQueries,
  issuesJqlSanitiseJqlQueries,
];
