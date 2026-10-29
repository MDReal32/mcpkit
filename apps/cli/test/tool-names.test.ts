import { describe, expect, it } from "vitest";
import { createToolAnnotations } from "../src/mcp/annotations/create-tool-annotations";
import { createToolName } from "../src/mcp/exposed/create-tool-name";

const MAX_NAME_LENGTH = 51;

describe("createToolName", () => {
  it("joins the server id and the tool name", () => {
    expect(createToolName("git:github", "issues:issues:get_issue")).toBe("git_github_issues_issues_get_issue");
  });

  it("shortens a long name to fit, keeping a stable hash of the full id", () => {
    const tool = "actions:workflow_runs:get_workflow_run_usage_for_a_repository_run";

    const name = createToolName("git:github", tool);

    expect(name.length).toBeLessThanOrEqual(MAX_NAME_LENGTH);
    expect(name).toMatch(/^git_github_actions_workflow_runs_.*_[0-9a-f]{6}$/);
    expect(createToolName("git:github", tool)).toBe(name);
  });

  it("gives a different name on another attempt", () => {
    expect(createToolName("a:b", "c:d", 1)).not.toBe(createToolName("a:b", "c:d"));
  });
});

describe("createToolAnnotations", () => {
  it("marks reads, deletes and known writes, and leaves other verbs alone", () => {
    expect(createToolAnnotations("get")).toEqual({ readOnlyHint: true });
    expect(createToolAnnotations("delete")).toEqual({ readOnlyHint: false, destructiveHint: true });
    expect(createToolAnnotations("create")).toEqual({ readOnlyHint: false });
    expect(createToolAnnotations("run")).toBeUndefined();
  });
});
