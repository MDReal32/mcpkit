import { validateManifest } from "@usemcpkit/native";
import { describe, expect, it } from "vitest";
import { clickup } from "../src/servers/clickup/clickup";
import { confluence } from "../src/servers/confluence/confluence";
import { discord } from "../src/servers/discord/discord";
import { figma } from "../src/servers/figma/figma";
import { github } from "../src/servers/github/github";
import { gitlab } from "../src/servers/gitlab/gitlab";
import { jira } from "../src/servers/jira/jira";
import { n8n } from "../src/servers/n8n/n8n";
import { n8nMcp } from "../src/servers/n8n-mcp/n8n-mcp";
import { reddit } from "../src/servers/reddit/reddit";

describe("bundled servers", () => {
  it.each([github, gitlab, jira, confluence, clickup, discord, figma, n8n, n8nMcp, reddit])(
    "$name compiles to a valid manifest",
    (server) => {
      expect(validateManifest(JSON.parse(JSON.stringify(server)))).toEqual([]);
    },
  );
});

describe("discord", () => {
  it("leaves out endpoints that only take a user's OAuth2 token", () => {
    const actions = discord.tools.map((tool) => tool.name.split(":").at(-1));

    expect(actions).toContain("list_my_guilds");
    expect(actions).not.toContain("get_my_guild_member");
    expect(actions).not.toContain("get_application_user_role_connection");
  });
});

describe("figma", () => {
  it("leaves out operations a personal access token cannot call", () => {
    const names = figma.tools.map((tool) => tool.name);

    expect(names).toContain("users:users:get_me");
    expect(names).not.toContain("projects:folders:post_team_folder");
  });
});

describe("n8n", () => {
  it("leaves out deprecated operations and uploads n8n packages as files", () => {
    const names = n8n.tools.map((tool) => tool.name);
    const importPackage = n8n.tools.find((tool) => tool.name === "instance:packages:import_package");

    expect(names).toContain("workflows:workflows:get_workflows");
    expect(names).not.toContain("workflows:workflows:activate_workflow");
    expect(importPackage?.request.fileArgs).toEqual(["package"]);
  });

  it("signs in to the MCP server of the same host the REST API server uses, with an MCP access token as the fallback", () => {
    expect(n8nMcp.domain).toEqual(n8n.domain);
    expect(n8nMcp.auth?.map((auth) => auth.type)).toEqual(["oauth", "bearer"]);
    expect(n8nMcp.upstream).toMatchObject({ type: "http", url: "https://{domain}/mcp-server/http" });
  });
});

describe("reddit", () => {
  it("trims listings to the post fields the spec declares", () => {
    const tool = reddit.tools.find((candidate) => candidate.name === "users:posts:list_user_posts");

    expect(tool?.response?.root).toBe("data.children");
    expect(tool?.response?.fields).toMatchObject({ title: "data.title", name: "data.name" });
  });
});

describe("confluence", () => {
  it("declares the Cloud edition and prefixes every tool path by its API", () => {
    const roots: Record<string, string> = {
      cloud: "/wiki/api/v2/",
      cloud_v1: "/wiki/rest/api/",
      datacenter: "/rest/api/",
    };

    expect(confluence.editions).toEqual({ cloud: { label: "Cloud", hosts: [".atlassian.net"] } });
    for (const tool of confluence.tools) {
      const [group = ""] = tool.name.split(":");
      expect(tool.request.path.startsWith(roots[group] ?? "unknown group"), tool.name).toBe(true);
    }
  });
});
