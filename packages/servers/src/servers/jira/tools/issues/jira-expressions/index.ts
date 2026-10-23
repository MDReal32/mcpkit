import { issuesJiraExpressionsAnalyseExpression } from "./analyse-expression";
import { issuesJiraExpressionsEvaluateJiraExpression } from "./evaluate-jira-expression";
import { issuesJiraExpressionsEvaluateJsisJiraExpression } from "./evaluate-jsis-jira-expression";

export const issuesJiraExpressionsTools = [
  issuesJiraExpressionsAnalyseExpression,
  issuesJiraExpressionsEvaluateJiraExpression,
  issuesJiraExpressionsEvaluateJsisJiraExpression,
];
