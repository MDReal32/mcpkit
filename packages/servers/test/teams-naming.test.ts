import { nameUpstreamTool } from "@usemcpkit/core";
import { describe, expect, it } from "vitest";
import { teams } from "../src/servers/teams/teams";

const UPSTREAM_TOOLS = [
  "start_thread",
  "update_thread",
  "read_thread",
  "list_threads",
  "get_member_by_name",
  "list_members",
];

const naming = teams.upstream?.naming;

describe("teams naming rules", () => {
  it("name every tool of the server as <group>:<resource>:<action>", () => {
    expect(UPSTREAM_TOOLS.map((tool) => nameUpstreamTool(naming, tool))).toEqual([
      "channel:threads:start",
      "channel:threads:update",
      "channel:threads:read",
      "channel:threads:list",
      "team:members:get_by_name",
      "team:members:list",
    ]);
  });

  it("leaves a tool the server adds later to the default name", () => {
    expect(nameUpstreamTool(naming, "something_new")).toBeUndefined();
  });
});
