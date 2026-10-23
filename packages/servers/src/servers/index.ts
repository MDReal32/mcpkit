import { confluence } from "./confluence/confluence";
import { github } from "./github/github";
import { gitlab } from "./gitlab/gitlab";
import { jira } from "./jira/jira";

export const servers = [confluence, github, gitlab, jira];
