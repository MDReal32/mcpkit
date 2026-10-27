import { TOOL_ID_SEPARATOR } from "../tools/const";
import { EXPOSED_NAME_SEPARATOR } from "./const";

/** `atlassian:jira:issues:get_issue` becomes `jira_issues_get_issue`; the category is dropped to keep names short. */
export const createExposedName = (id: string) => id.split(TOOL_ID_SEPARATOR).slice(1).join(EXPOSED_NAME_SEPARATOR);
