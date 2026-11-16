import { defineServer } from "@usemcpkit/core";
import { FIGMA_BASE, FIGMA_SOURCES } from "./const";

export const figma = defineServer({
  ...FIGMA_BASE,
  name: "figma",
  description:
    "Figma REST API: files and their nodes, rendered images and image fills, versions, comments and reactions, dev resources, published components, component sets, styles and variables, library analytics, teams' projects and folders, webhooks and the current user. Tools are named after their endpoint, '<path>:<method>' (v1/files/{file_key}/nodes:get). A file key is the part after /design/ in a Figma link, and a node id looks like 1:2 (a link carries it as node-id=1-2). v1/files/{file_key}:get returns the whole document and can be enormous: prefer v1/files/{file_key}/nodes:get with ids, or pass depth. Variables need an Enterprise plan; operations that need an OAuth app or an organization token are not included.",
  openapi: { sources: FIGMA_SOURCES },
  tools: [],
});
