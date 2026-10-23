import { createPingManifest } from "@usemcpkit/testing";
import { describe, expect, it } from "vitest";
import type { AuthSpec, Manifest, ToolSpec } from "../src/main";
import { buildRequest, executeTool, validateManifest } from "../src/main";
import { createRecordingFetch } from "./fixtures/create-recording-fetch";

const NO_AUTH = { headers: {}, query: {} };

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
  it.each([
    ["acme.atlassian.net", "https://acme.atlassian.net/rest/api/2/search/jql?fields=summary&jql=x"],
    ["jira.example.com/jira", "https://jira.example.com/jira/rest/api/2/search?fields=summary&jql=x"],
  ])("sends %s the request of its edition and maps the response", async (host, url) => {
    const { recordingFetch, requests } = createRecordingFetch({ [url]: { issues: [{ key: "A-1", id: "1" }] } });

    const result = await executeTool(
      createEditionManifest(),
      searchTool,
      { jql: "x" },
      { env: { TRACKER_HOST: host, TOKEN: "t" }, fetchImpl: recordingFetch },
    );

    expect(requests.map((request) => request.url)).toEqual([url]);
    expect(result).toEqual([{ key: "A-1" }]);
  });

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

describe("request bodies", () => {
  it("nests dotted keys, indexes arrays and merges fixed values under the args", () => {
    const tool: ToolSpec = {
      name: "create",
      description: "Create",
      input: { type: "object", properties: { project: { type: "string" }, parent: { type: "string" } } },
      request: {
        method: "POST",
        path: "/issue",
        body: { "fields.project.key": "project", "ancestors.0.id": "parent" },
        fixedBody: { type: "page", "body.storage.representation": "storage" },
      },
    };
    const manifest: Manifest = { ...createPingManifest("1.0.0"), tools: [tool] };

    const request = buildRequest(manifest, tool, { project: "ABC", parent: "42" }, NO_AUTH);

    expect(JSON.parse(String(request.body))).toEqual({
      type: "page",
      body: { storage: { representation: "storage" } },
      fields: { project: { key: "ABC" } },
      ancestors: [{ id: "42" }],
    });
  });
});
