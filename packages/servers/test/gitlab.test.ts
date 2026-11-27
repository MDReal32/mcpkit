import { describe, expect, it } from "vitest";
import { gitlab } from "../src/servers/git";

describe("gitlab", () => {
  it("reads and writes merge request notes and discussions itself on self-managed, whose description has none", () => {
    const names = gitlab.tools.map((tool) => tool.name);

    expect(names).toContain("api/v4/projects/{id}/merge_requests/{noteable_id}/notes:get");
    expect(names).toContain("api/v4/projects/{id}/merge_requests/{noteable_id}/notes:post");
    expect(names).toContain("api/v4/projects/{id}/merge_requests/{noteable_id}/discussions:get");
    expect(names).toContain("api/v4/projects/{id}/merge_requests/{noteable_id}/discussions/{discussion_id}/notes:post");
    expect(new Set(names).size).toBe(names.length);
  });

  it("applies those tools only to the self-managed source, since gitlab.com's description has them", () => {
    for (const tool of gitlab.tools) {
      expect(tool.applies, tool.name).toEqual({ sources: ["self-managed"] });
    }
  });

  it("names each tool after the endpoint it calls", () => {
    for (const tool of gitlab.tools) {
      const separator = tool.name.lastIndexOf(":");
      expect(tool.request.path.replace(/^\//, ""), tool.name).toBe(tool.name.slice(0, separator));
      expect(tool.request.method.toLowerCase(), tool.name).toBe(tool.name.slice(separator + 1));
    }
  });

  it("declares every path placeholder as a required argument", () => {
    for (const tool of gitlab.tools) {
      const placeholders = [...tool.request.path.matchAll(/\{(\w+)\}/g)].map((match) => match[1]);
      for (const placeholder of placeholders) {
        expect(tool.input.required, tool.name).toContain(placeholder);
      }
    }
  });
});
