import type { Manifest } from "@usemcpkit/core";
import { defineServer } from "@usemcpkit/core";
import { DISCORD_BASE } from "./const";

export const defineDiscordServer = (server: Pick<Manifest, "name" | "description" | "tools">) =>
  defineServer({ ...DISCORD_BASE, ...server });
