import type { Manifest } from "@usemcpkit/core";
import { defineServer } from "@usemcpkit/core";
import { REDDIT_BASE } from "./const";

export const defineRedditServer = (server: Pick<Manifest, "name" | "description" | "tools">) =>
  defineServer({ ...REDDIT_BASE, ...server });
