import { defineGitlabServer } from "../../providers/gitlab";
import { gitlabTools } from "./tools";

export const gitlab = defineGitlabServer({
  name: "gitlab",
  description:
    "GitLab REST API (gitlab.com and self-managed): projects, issues and merge requests, CI/CD, packages, security, groups, users, administration, AI and meta endpoints. Tools are named '<group>:<resource>:<action>'.",
  tools: gitlabTools,
});
