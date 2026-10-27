import type { Manifest, ToolArgs } from "@usemcpkit/core";
import { executeTool, validateManifest } from "@usemcpkit/core";
import { useTempDir } from "@usemcpkit/testing";
import { describe, expect, it } from "vitest";
import { clickup } from "../src/servers/clickup/clickup";
import { confluence } from "../src/servers/confluence/confluence";
import { github } from "../src/servers/github/github";
import { gitlab } from "../src/servers/gitlab/gitlab";
import { jira } from "../src/servers/jira/jira";

const readHome = useTempDir("mcpkit-servers-");

interface SentRequest {
  method: string;
  url: string;
  body: unknown;
  headers: Headers;
}

const sendTool = async (manifest: Manifest, toolName: string, args: ToolArgs, env: NodeJS.ProcessEnv) => {
  const sent: SentRequest[] = [];
  const tool = manifest.tools.find((candidate) => candidate.name === toolName);
  if (!tool) {
    throw new Error(`${manifest.name} has no tool ${toolName}`);
  }
  const fetchImpl: typeof fetch = async (input, init) => {
    const body = init?.body ? JSON.parse(String(init.body)) : undefined;
    sent.push({ method: init?.method ?? "GET", url: String(input), body, headers: new Headers(init?.headers) });
    return new Response("{}", { status: 200, headers: { "content-type": "application/json" } });
  };
  await executeTool(manifest, tool, args, { env: { MCPKIT_HOME: readHome(), ...env }, fetchImpl });
  return sent;
};

const JIRA_CLOUD = { JIRA_HOST: "acme.atlassian.net", JIRA_USERNAME: "me@acme.com", JIRA_API_TOKEN: "t" };

const JIRA_DATA_CENTER = { JIRA_HOST: "jira.acme.com/jira", JIRA_PERSONAL_TOKEN: "t" };

const CONFLUENCE_CLOUD = {
  CONFLUENCE_HOST: "acme.atlassian.net",
  CONFLUENCE_USERNAME: "me",
  CONFLUENCE_API_TOKEN: "t",
};

const CONFLUENCE_DATA_CENTER = { CONFLUENCE_HOST: "wiki.acme.com", CONFLUENCE_PERSONAL_TOKEN: "t" };

describe("bundled servers", () => {
  it.each([github, gitlab, jira, confluence, clickup])("$name compiles to a valid manifest", (server) => {
    expect(validateManifest(JSON.parse(JSON.stringify(server)))).toEqual([]);
  });
});

describe("github", () => {
  it("fills path and query parameters and sends the body under renamed keys", async () => {
    const env = { GITHUB_TOKEN: "t" };
    const [content] = await sendTool(
      github,
      "repos:repos:get_content",
      { owner: "a", repo: "b", path: "x", ref: "dev" },
      env,
    );
    const [created] = await sendTool(
      github,
      "issues:issues:create",
      { owner: "a", repo: "b", title: "T", labels: ["bug"] },
      env,
    );

    expect(content?.url).toBe("https://api.github.com/repos/a/b/contents/x?ref=dev");
    expect(created?.method).toBe("POST");
    expect(created?.body).toEqual({ title: "T", labels: ["bug"] });
  });
});

describe("gitlab", () => {
  it("encodes the project path and targets the API of the configured host", async () => {
    const [saas] = await sendTool(
      gitlab,
      "projects:projects:get_projects_issues",
      { id: "acme/app", issue_iid: 7 },
      { GITLAB_TOKEN: "t" },
    );
    const [selfManaged] = await sendTool(
      gitlab,
      "projects:projects:list_projects_issues",
      { id: "acme/sub/app", state: "opened" },
      { GITLAB_HOST: "git.acme.com/gitlab", GITLAB_TOKEN: "t" },
    );

    expect(saas?.url).toBe("https://gitlab.com/api/v4/projects/acme%2Fapp/issues/7");
    const selfManagedUrl = new URL(selfManaged?.url ?? "");

    expect(selfManagedUrl.origin + selfManagedUrl.pathname).toBe(
      "https://git.acme.com/gitlab/api/v4/projects/acme%2Fsub%2Fapp/issues",
    );
    expect(selfManagedUrl.searchParams.get("state")).toBe("opened");
  });

  it("lists projects and posts comment bodies", async () => {
    const [projects] = await sendTool(
      gitlab,
      "projects:projects:list_projects",
      { search: "app", membership: true },
      { GITLAB_TOKEN: "t" },
    );
    const [comment] = await sendTool(
      gitlab,
      "issues:notes:create_projects_merge_requests_notes",
      { id: "acme/app", noteable_id: 3, body: "LGTM" },
      { GITLAB_TOKEN: "t" },
    );

    expect(new URL(projects?.url ?? "").searchParams.get("membership")).toBe("true");
    expect(comment).toMatchObject({
      method: "POST",
      url: "https://gitlab.com/api/v4/projects/acme%2Fapp/merge_requests/3/notes",
      body: { body: "LGTM" },
    });
  });
});

describe("jira", () => {
  const SEARCH = "issues:issue_search:search_and_reconsile_issues_using_jql";

  it("searches with the endpoint of each edition", async () => {
    const args = { jql: "project = A", maxResults: 10 };

    const [cloud] = await sendTool(jira, SEARCH, { ...args, nextPageToken: "abc" }, JIRA_CLOUD);
    const [dataCenter] = await sendTool(jira, SEARCH, { ...args, startAt: 5 }, JIRA_DATA_CENTER);

    const cloudUrl = new URL(cloud?.url ?? "");
    const dataCenterUrl = new URL(dataCenter?.url ?? "");
    expect(cloudUrl.origin + cloudUrl.pathname).toBe("https://acme.atlassian.net/rest/api/2/search/jql");
    expect(cloudUrl.searchParams.get("jql")).toBe("project = A");
    expect(cloudUrl.searchParams.get("nextPageToken")).toBe("abc");
    expect(cloudUrl.searchParams.has("startAt")).toBe(false);
    expect(dataCenterUrl.origin + dataCenterUrl.pathname).toBe("https://jira.acme.com/jira/rest/api/2/search");
    expect(dataCenterUrl.searchParams.get("startAt")).toBe("5");
    expect(dataCenterUrl.searchParams.has("nextPageToken")).toBe(false);
  });

  it("posts the search body to the endpoint of each edition", async () => {
    const name = "issues:issue_search:search_and_reconsile_issues_using_jql_post";

    const [cloud] = await sendTool(jira, name, { jql: "project = A" }, JIRA_CLOUD);
    const [dataCenter] = await sendTool(jira, name, { jql: "project = A" }, JIRA_DATA_CENTER);

    expect(cloud).toMatchObject({ method: "POST", url: "https://acme.atlassian.net/rest/api/2/search/jql" });
    expect(dataCenter).toMatchObject({ method: "POST", url: "https://jira.acme.com/jira/rest/api/2/search" });
    expect(dataCenter?.body).toMatchObject({ jql: "project = A" });
  });

  it("sends the create_issue fields object as the nested body", async () => {
    const fields = { project: { key: "A" }, summary: "Broken", issuetype: { name: "Task" } };

    const [request] = await sendTool(jira, "issues:issues:create_issue", { fields }, JIRA_DATA_CENTER);

    expect(request?.method).toBe("POST");
    expect(request?.url).toMatch(/^https:\/\/jira\.acme\.com\/jira\/rest\/api\/2\/issue\?/);
    expect(request?.body).toEqual({ fields });
  });

  it("lists agile boards from the agile endpoint", async () => {
    const [request] = await sendTool(jira, "software:board:get_all_boards", {}, JIRA_CLOUD);

    expect(request?.url).toMatch(/^https:\/\/acme\.atlassian\.net\/rest\/agile\/1\.0\/board\?/);
  });
});

describe("jira comments", () => {
  it("deletes a comment by issue key and comment id", async () => {
    const [request] = await sendTool(
      jira,
      "issues:issue_comments:delete_comment",
      { issueIdOrKey: "A-1", id: "10" },
      JIRA_DATA_CENTER,
    );

    expect(request).toMatchObject({
      method: "DELETE",
      url: "https://jira.acme.com/jira/rest/api/2/issue/A-1/comment/10",
    });
  });
});

describe("clickup", () => {
  const env = { CLICKUP_API_TOKEN: "pk_1_ABC" };

  it("sends the personal token as the raw Authorization header", async () => {
    const [request] = await sendTool(clickup, "tasks:tasks:get_task", { task_id: "abc" }, env);

    expect(request?.url).toBe("https://api.clickup.com/api/v2/task/abc");
    expect(request?.headers.get("Authorization")).toBe("pk_1_ABC");
  });

  it("repeats array filters under their bracketed names and keeps JSON filters whole", async () => {
    const customFields = '[{"field_id":"f","operator":"=","value":"1"}]';

    const [request] = await sendTool(
      clickup,
      "tasks:tasks:get_tasks",
      { list_id: 7, statuses: ["to do", "in progress"], custom_fields: customFields },
      env,
    );

    const url = new URL(request?.url ?? "");
    expect(url.pathname).toBe("/api/v2/list/7/task");
    expect(url.searchParams.getAll("statuses[]")).toEqual(["to do", "in progress"]);
    expect(url.searchParams.get("custom_fields")).toBe(customFields);
  });

  it("fills the Workspace placeholder of team-level v2 paths", async () => {
    const [request] = await sendTool(
      clickup,
      "time:time_tracking:get_time_entries_within_a_date_range",
      { team_Id: 9 },
      env,
    );

    expect(request?.url).toBe("https://api.clickup.com/api/v2/team/9/time_entries");
  });

  it("reaches the v3 API under the same base URL", async () => {
    const [request] = await sendTool(clickup, "docs:docs:search_for_docs", { workspace_id: "9", limit: 5 }, env);

    const url = new URL(request?.url ?? "");
    expect(url.origin + url.pathname).toBe("https://api.clickup.com/api/v3/workspaces/9/docs");
    expect(url.searchParams.get("limit")).toBe("5");
  });
});

describe("confluence", () => {
  const pageBody = { title: "Notes", body: { representation: "storage", value: "<p>Hi</p>" } };

  it("creates content through the Data Center API on a Data Center host", async () => {
    const [request] = await sendTool(
      confluence,
      "datacenter:content:create",
      {
        type: "page",
        title: "Notes",
        space: { key: "DOCS" },
        body: { storage: { value: "<p>Hi</p>", representation: "storage" } },
        ancestors: [{ id: "7" }],
      },
      CONFLUENCE_DATA_CENTER,
    );

    expect(request?.method).toBe("POST");
    expect(request?.url).toBe("https://wiki.acme.com/rest/api/content");
    expect(request?.body).toEqual({
      type: "page",
      title: "Notes",
      space: { key: "DOCS" },
      body: { storage: { value: "<p>Hi</p>", representation: "storage" } },
      ancestors: [{ id: "7" }],
    });
  });

  it("keeps the context path of a Data Center host", async () => {
    const [request] = await sendTool(
      confluence,
      "datacenter:content:get",
      { id: "7", expand: "body.storage" },
      { CONFLUENCE_HOST: "wiki.acme.com/confluence", CONFLUENCE_PERSONAL_TOKEN: "t" },
    );

    expect(request?.url).toBe("https://wiki.acme.com/confluence/rest/api/content/7?expand=body.storage");
  });

  it("creates pages through the v2 API on a Cloud host", async () => {
    const [request] = await sendTool(
      confluence,
      "cloud:pages:create_page",
      { spaceId: "123", parentId: "7", status: "current", ...pageBody },
      CONFLUENCE_CLOUD,
    );

    expect(request?.url).toBe("https://acme.atlassian.net/wiki/api/v2/pages");
    expect(request?.body).toEqual({ spaceId: "123", parentId: "7", status: "current", ...pageBody });
  });

  it("renames hyphenated v2 parameters to word-character arguments and sends them under the original keys", async () => {
    const [request] = await sendTool(
      confluence,
      "cloud:pages:get_page_by_id",
      { id: "7", body_format: "storage", get_draft: true },
      CONFLUENCE_CLOUD,
    );

    expect(request?.url).toBe("https://acme.atlassian.net/wiki/api/v2/pages/7?body-format=storage&get-draft=true");
  });

  it("reaches the Cloud v1 API under /wiki/rest/api", async () => {
    const [request] = await sendTool(
      confluence,
      "cloud_v1:search:search_by_cql",
      { cql: "type = page", limit: 5 },
      CONFLUENCE_CLOUD,
    );

    expect(request?.url).toBe("https://acme.atlassian.net/wiki/rest/api/search?cql=type+%3D+page&limit=5");
  });

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
