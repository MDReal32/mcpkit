import type { Manifest } from "@usemcpkit/core";
import { defineServer } from "@usemcpkit/core";
import { CLICKUP_BASE } from "./const";

export const defineClickupServer = (server: Pick<Manifest, "name" | "description" | "tools">) =>
  defineServer({ ...CLICKUP_BASE, ...server });
