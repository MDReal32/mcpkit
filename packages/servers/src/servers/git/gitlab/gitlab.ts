import { defineServer } from "@usemcpkit/core";
import { GITLAB_BASE, GITLAB_SOURCES } from "./const";

export const gitlab = defineServer({
  ...GITLAB_BASE,
  name: "gitlab",
  description:
    "GitLab REST API of gitlab.com or of the self-managed release the host runs: projects, issues and merge requests, CI/CD, packages, security, groups, users, administration, AI and meta endpoints. Tools are named after their endpoint, '<path>:<method>' (api/v4/projects/{id}/merge_requests:get).",
  openapi: { sources: GITLAB_SOURCES },
  tools: [],
});
