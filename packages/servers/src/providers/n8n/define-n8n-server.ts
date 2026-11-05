import type { Manifest } from "@usemcpkit/core";
import { defineServer } from "@usemcpkit/core";
import { N8N_BASE } from "./const";

export const defineN8nServer = (server: Pick<Manifest, "name" | "description" | "tools">) =>
  defineServer({ ...N8N_BASE, ...server });
