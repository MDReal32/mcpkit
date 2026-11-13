import { defineServer } from "@usemcpkit/core";
import { GITHUB_BASE, GITHUB_SOURCES } from "./const";
import { getReleaseAsset } from "./tools/get-release-asset";

export const github = defineServer({
  ...GITHUB_BASE,
  name: "github",
  description:
    "GitHub REST API of github.com or of the GitHub Enterprise Server version the host runs: repositories, issues and pull requests, Actions, security, organizations, users, apps, Copilot and meta endpoints. Tools are named after their endpoint, '<path>:<method>' (repos/{owner}/{repo}/pulls:get), and grouped by the path's first segment.",
  openapi: { sources: GITHUB_SOURCES },
  tools: [getReleaseAsset],
});
