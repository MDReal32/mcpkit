import { validateManifest } from "@usemcpkit/native";
import { describe, expect, it } from "vitest";
import { clickup } from "../src/servers/clickup/clickup";
import { confluence } from "../src/servers/confluence/confluence";
import { discord } from "../src/servers/discord/discord";
import { github } from "../src/servers/github/github";
import { gitlab } from "../src/servers/gitlab/gitlab";
import { jira } from "../src/servers/jira/jira";
import { reddit } from "../src/servers/reddit/reddit";

describe("bundled servers", () => {
  it.each([github, gitlab, jira, confluence, clickup, discord, reddit])(
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
