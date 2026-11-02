import type { Manifest } from "@usemcpkit/core";
import { defineServer } from "@usemcpkit/core";
import { MEDIUM_BASE } from "./const";

export const defineMediumServer = (server: Pick<Manifest, "name" | "description" | "tools">) =>
  defineServer({ ...MEDIUM_BASE, ...server });
