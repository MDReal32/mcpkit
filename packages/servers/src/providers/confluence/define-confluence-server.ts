import type { Manifest } from "@usemcpkit/core";
import { defineServer } from "@usemcpkit/core";
import { CONFLUENCE_BASE } from "./const";

export const defineConfluenceServer = (server: Pick<Manifest, "name" | "description" | "tools">) =>
  defineServer({ ...CONFLUENCE_BASE, ...server });
