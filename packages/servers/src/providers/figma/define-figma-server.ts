import type { Manifest } from "@usemcpkit/core";
import { defineServer } from "@usemcpkit/core";
import { FIGMA_BASE } from "./const";

export const defineFigmaServer = (server: Pick<Manifest, "name" | "description" | "tools">) =>
  defineServer({ ...FIGMA_BASE, ...server });
