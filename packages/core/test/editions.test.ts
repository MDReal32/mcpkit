import { createPingManifest } from "@usemcpkit/testing";
import { describe, expect, it } from "vitest";
import type { AuthSpec, Manifest, ToolSpec } from "../src/main";
import { validateManifest } from "../src/main";

const searchTool: ToolSpec = {
  name: "search",
  description: "Search",
  input: { type: "object", properties: { jql: { type: "string" } }, required: ["jql"] },
  request: { method: "GET", path: "/rest/api/2/search", query: ["jql"], fixedQuery: { fields: "summary" } },
  response: { root: "issues", fields: { key: "key" } },
  editions: {
    cloud: {
      request: { method: "GET", path: "/rest/api/2/search/jql", query: ["jql"], fixedQuery: { fields: "summary" } },
    },
  },
};

const createEditionManifest = () => {
  const auth: readonly AuthSpec[] = [{ type: "bearer", env: "TOKEN", label: "Personal access token" }];
  const manifest: Manifest = {
    ...createPingManifest("1.0.0", "", "tracker", auth),
    baseUrl: "https://{domain}",
    domain: { env: "TRACKER_HOST" },
    editions: { cloud: { label: "Cloud", hosts: [".atlassian.net"] } },
    tools: [searchTool],
  };
  return manifest;
};

describe("editions", () => {
  it("is validated against the manifest editions and the tool args", () => {
    const manifest = createEditionManifest();
    const broken = {
      ...manifest,
      editions: { Cloud: { hosts: [] } },
      tools: [
        {
          ...searchTool,
          editions: { server: { request: { method: "GET", path: "/x/{missing}", fixedQuery: { a: {} } } } },
        },
      ],
      auth: [{ type: "bearer", env: "TOKEN", label: 1 }],
    };

    expect(validateManifest(createEditionManifest())).toEqual([]);
    expect(validateManifest(broken)).toEqual([
      "editions.Cloud: name must match /^[a-z][a-z0-9-]*$/",
      "auth[0].label must be a string",
      'tools[0] (search).editions.server: "server" is not in the manifest\'s editions',
    ]);
  });
});
