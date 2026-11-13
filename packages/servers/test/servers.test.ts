import { validateManifest } from "@usemcpkit/native";
import { describe, expect, it } from "vitest";
import { clickup } from "../src/servers/clickup/clickup";
import { confluence } from "../src/servers/confluence/confluence";
import { discord } from "../src/servers/discord/discord";
import { figma } from "../src/servers/figma/figma";
import { github } from "../src/servers/github/github";
import { gitlab } from "../src/servers/gitlab/gitlab";
import { jira } from "../src/servers/jira/jira";
import { medium } from "../src/servers/medium/medium";
import { n8n } from "../src/servers/n8n/n8n";
import { reddit } from "../src/servers/reddit/reddit";

const OPENAPI_SERVERS = [github, gitlab, jira, confluence, clickup, discord, figma, n8n, reddit, medium];

describe("bundled OpenAPI servers", () => {
  it.each(OPENAPI_SERVERS)("$name compiles to a valid manifest", (server) => {
    expect(validateManifest(JSON.parse(JSON.stringify(server)))).toEqual([]);
  });

  it.each(OPENAPI_SERVERS)(
    "$name pins every document without versions that it does not take from its vendor's site",
    (server) => {
      const unpinned = (server.openapi?.sources ?? []).filter(
        (source) =>
          source.version === undefined && source.sha256 === undefined && source.url.includes("githubusercontent"),
      );

      expect(unpinned).toEqual([]);
    },
  );

  it.each(OPENAPI_SERVERS)("$name names its hand-written tools after the endpoint they replace", (server) => {
    for (const tool of server.tools) {
      expect(tool.name, tool.name).toMatch(/^[^/\s][^\s]*:(get|post|put|patch|delete)$/);
    }
  });
});

describe("deployments", () => {
  it("builds github.com and gitlab.com from pinned documents and the self-hosted ones from their own version's", () => {
    for (const server of [github, gitlab]) {
      const [hosted, selfHosted] = server.openapi?.sources ?? [];
      expect(hosted?.hosts).toBeDefined();
      expect(hosted?.sha256).toMatch(/^[0-9a-f]{64}$/);
      expect(selfHosted?.hosts).toBeUndefined();
      expect(selfHosted?.url).toContain("{version}");
      expect(server.domain?.check).toBe(true);
    }
  });

  it("merges the two Cloud documents of Jira and Confluence and offers each sign-in where it works", () => {
    for (const server of [jira, confluence]) {
      const sources = server.openapi?.sources ?? [];
      expect(sources.filter((source) => source.hosts?.includes(".atlassian.net")).length).toBe(2);
      expect(sources.at(-1)).toMatchObject({ name: "datacenter", version: { known: expect.any(Object) } });
      expect(server.auth?.map((auth) => ("applies" in auth ? auth.applies?.sources : undefined))).toEqual([
        sources.slice(0, 2).map((source) => source.name),
        ["datacenter"],
      ]);
    }
  });
});

describe("jira", () => {
  it("downloads attachments and thumbnails on Data Center from the servlets its metadata points at", () => {
    expect(jira.tools.map((tool) => [tool.name, tool.request.path, tool.applies])).toEqual([
      ["rest/api/2/attachment/content/{id}:get", "/secure/attachment/{id}/{filename}", { sources: ["datacenter"] }],
      [
        "rest/api/2/attachment/thumbnail/{id}:get",
        "/secure/thumbnail/{id}/_thumb_{id}.png",
        { sources: ["datacenter"] },
      ],
    ]);
  });
});

describe("n8n", () => {
  it("signs the REST tools with the API key and its MCP server, on the same host, with its own OAuth or an MCP access token", () => {
    const upstream = n8n.upstream?.type === "http" ? n8n.upstream : undefined;

    expect(n8n.auth?.map((auth) => auth.type)).toEqual(["header"]);
    expect(upstream).toMatchObject({ type: "http", url: "https://{domain}/mcp-server/http" });
    expect(upstream?.auth?.map((auth) => auth.type)).toEqual(["oauth", "bearer"]);
  });
});
