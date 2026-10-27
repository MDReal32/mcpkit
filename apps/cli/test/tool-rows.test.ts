import { createFakeFetch, createPingManifest } from "@usemcpkit/testing";
import { describe, expect, it } from "vitest";
import type { Catalog } from "../src/mcp";
import { createRpcHandler } from "../src/mcp";

const manifest = createPingManifest("1.0.0", "", "demo");

const catalog: Catalog = {
  servers: [
    {
      id: "test:demo",
      tools: [
        "issues:issues:get_issue",
        "issues:issues:disable_issue",
        "issues:issues:enable_issue",
        "issues:issue_comments:get_comments",
        "issues:issues:delete_issue",
        "ping:run",
      ],
    },
  ],
  loadManifest: async () => manifest,
};

const handle = createRpcHandler(catalog, { fetchImpl: createFakeFetch(200, { pong: true }) });

const textOf = (result: unknown) => (result as { content: { text: string }[] }).content[0]?.text ?? "";

describe("tool rows", () => {
  it("lists one row per server, group and verb after the meta-tools", async () => {
    const response = await handle({ id: 1, method: "tools/list" });

    const result = response?.result as { tools: { name: string }[] } | undefined;
    expect(result?.tools.map((tool) => tool.name)).toEqual([
      "list_servers",
      "list_tools",
      "describe_tool",
      "call_tool",
      "test_demo_issues_get",
      "test_demo_issues_disable",
      "test_demo_issues_enable",
      "test_demo_issues_delete",
      "test_demo_run",
    ]);
  });

  it("runs a tool the row covers", async () => {
    const response = await handle({
      id: 2,
      method: "tools/call",
      params: { name: "test_demo_run", arguments: { tool: "ping:run", arguments: {} } },
    });

    expect(textOf(response?.result)).toContain("pong");
  });

  it("refuses a tool another row owns", async () => {
    const response = await handle({
      id: 3,
      method: "tools/call",
      params: { name: "test_demo_issues_get", arguments: { tool: "issues:delete_issue" } },
    });

    expect(textOf(response?.result)).toContain("does not cover");
  });

  it("marks reads as read-only and deletes as destructive, known writes as writes and unknown verbs as unannotated", async () => {
    const response = await handle({ id: 4, method: "tools/list" });

    const result = response?.result as { tools: { name: string; annotations?: unknown }[] } | undefined;
    const annotations = Object.fromEntries(result?.tools.map((tool) => [tool.name, tool.annotations]) ?? []);
    expect(annotations.test_demo_issues_get).toEqual({ readOnlyHint: true });
    expect(annotations.test_demo_issues_delete).toEqual({ readOnlyHint: false, destructiveHint: true });
    expect(annotations.test_demo_issues_disable).toEqual({ readOnlyHint: true });
    expect(annotations.test_demo_issues_enable).toEqual({ readOnlyHint: false });
    expect(annotations.test_demo_run).toBeUndefined();
  });
});
