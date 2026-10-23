import type { Manifest } from "@usemcpkit/core";
import { defineServer } from "@usemcpkit/core";
import { GITLAB_BASE } from "./const";

export const defineGitlabServer = (server: Pick<Manifest, "name" | "description" | "tools">) =>
  defineServer({ ...GITLAB_BASE, ...server });
