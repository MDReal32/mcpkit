import { defineJiraServer } from "../../providers/jira";
import { jiraTools } from "./tools";

export const jira = defineJiraServer({
  name: "jira",
  description:
    "Jira REST API (Cloud and Data Center): issues, projects, users, workflows, fields, dashboards and filters, administration, apps and Jira Software boards and sprints. Tools are named '<group>:<resource>:<action>' and use the /rest/api/2 endpoints (Jira Software: /rest/agile/1.0), so endpoints that exist only on Cloud fail on Data Center. Issue search picks the endpoint of the deployment.",
  tools: jiraTools,
});
