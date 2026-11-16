import { defineServer } from "@usemcpkit/core";
import { CONFLUENCE_BASE, CONFLUENCE_SOURCES } from "./const";

export const confluence = defineServer({
  ...CONFLUENCE_BASE,
  name: "confluence",
  description:
    "Confluence REST API of Confluence Cloud (REST v2 and v1) or of the Data Center release the host runs: pages, blog posts, spaces, attachments, comments, labels, properties, users and groups, permissions and administration. Tools are named after their endpoint, '<path>:<method>' (wiki/api/v2/pages/{id}:get on Cloud, rest/api/content/{id}:get on Data Center).",
  openapi: { sources: CONFLUENCE_SOURCES },
  tools: [],
});
