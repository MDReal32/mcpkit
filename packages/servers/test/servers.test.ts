import type { Manifest, ToolArgs } from '@usemcpkit/core';
import { executeTool, validateManifest } from '@usemcpkit/core';
import { useTempDir } from '@usemcpkit/testing';
import { describe, expect, it } from 'vitest';
import { confluence } from '../src/servers/confluence/confluence';
import { github } from '../src/servers/github/github';
import { gitlab } from '../src/servers/gitlab/gitlab';
import { jira } from '../src/servers/jira/jira';

const readHome = useTempDir('mcpkit-servers-');

interface SentRequest {
  method: string;
  url: string;
  body: unknown;
}

const sendTool = async (manifest: Manifest, toolName: string, args: ToolArgs, env: NodeJS.ProcessEnv) => {
  const sent: SentRequest[] = [];
  const tool = manifest.tools.find((candidate) => candidate.name === toolName);
  if (!tool) {
    throw new Error(`${manifest.name} has no tool ${toolName}`);
  }
  const fetchImpl: typeof fetch = async (input, init) => {
    const body = init?.body ? JSON.parse(String(init.body)) : undefined;
    sent.push({ method: init?.method ?? 'GET', url: String(input), body });
    return new Response('{}', { status: 200, headers: { 'content-type': 'application/json' } });
  };
  await executeTool(manifest, tool, args, { env: { MCPKIT_HOME: readHome(), ...env }, fetchImpl });
  return sent;
};

const JIRA_CLOUD = { JIRA_HOST: 'acme.atlassian.net', JIRA_USERNAME: 'me@acme.com', JIRA_API_TOKEN: 't' };

const JIRA_DATA_CENTER = { JIRA_HOST: 'jira.acme.com/jira', JIRA_PERSONAL_TOKEN: 't' };

const CONFLUENCE_CLOUD = {
  CONFLUENCE_HOST: 'acme.atlassian.net',
  CONFLUENCE_USERNAME: 'me',
  CONFLUENCE_API_TOKEN: 't',
};

const CONFLUENCE_DATA_CENTER = { CONFLUENCE_HOST: 'wiki.acme.com', CONFLUENCE_PERSONAL_TOKEN: 't' };

describe('bundled servers', () => {
  it.each([github, gitlab, jira, confluence])('$name compiles to a valid manifest', (server) => {
    expect(validateManifest(JSON.parse(JSON.stringify(server)))).toEqual([]);
  });
});

describe('github', () => {
  it('fills path and query parameters and sends the body under renamed keys', async () => {
    const env = { GITHUB_TOKEN: 't' };
    const [content] = await sendTool(
      github,
      'repos:repos:get_content',
      { owner: 'a', repo: 'b', path: 'x', ref: 'dev' },
      env,
    );
    const [created] = await sendTool(
      github,
      'issues:issues:create',
      { owner: 'a', repo: 'b', title: 'T', labels: ['bug'] },
      env,
    );

    expect(content?.url).toBe('https://api.github.com/repos/a/b/contents/x?ref=dev');
    expect(created?.method).toBe('POST');
    expect(created?.body).toEqual({ title: 'T', labels: ['bug'] });
  });
});

describe('gitlab', () => {
  it('encodes the project path and targets the API of the configured host', async () => {
    const [saas] = await sendTool(
      gitlab,
      'projects:projects:get_projects_issues',
      { id: 'acme/app', issue_iid: 7 },
      { GITLAB_TOKEN: 't' },
    );
    const [selfManaged] = await sendTool(
      gitlab,
      'projects:projects:list_projects_issues',
      { id: 'acme/sub/app', state: 'opened' },
      { GITLAB_HOST: 'git.acme.com/gitlab', GITLAB_TOKEN: 't' },
    );

    expect(saas?.url).toBe('https://gitlab.com/api/v4/projects/acme%2Fapp/issues/7');
    const selfManagedUrl = new URL(selfManaged?.url ?? '');

    expect(selfManagedUrl.origin + selfManagedUrl.pathname).toBe(
      'https://git.acme.com/gitlab/api/v4/projects/acme%2Fsub%2Fapp/issues',
    );
    expect(selfManagedUrl.searchParams.get('state')).toBe('opened');
  });

  it('lists projects and posts comment bodies', async () => {
    const [projects] = await sendTool(
      gitlab,
      'projects:projects:list_projects',
      { search: 'app', membership: true },
      { GITLAB_TOKEN: 't' },
    );
    const [comment] = await sendTool(
      gitlab,
      'issues:notes:create_projects_merge_requests_notes',
      { id: 'acme/app', noteable_id: 3, body: 'LGTM' },
      { GITLAB_TOKEN: 't' },
    );

    expect(new URL(projects?.url ?? '').searchParams.get('membership')).toBe('true');
    expect(comment).toMatchObject({
      method: 'POST',
      url: 'https://gitlab.com/api/v4/projects/acme%2Fapp/merge_requests/3/notes',
      body: { body: 'LGTM' },
    });
  });
});

describe('jira', () => {
  const SEARCH = 'issues:issue_search:search_and_reconsile_issues_using_jql';

  it('searches with the endpoint of each edition', async () => {
    const args = { jql: 'project = A', maxResults: 10 };

    const [cloud] = await sendTool(jira, SEARCH, { ...args, nextPageToken: 'abc' }, JIRA_CLOUD);
    const [dataCenter] = await sendTool(jira, SEARCH, { ...args, startAt: 5 }, JIRA_DATA_CENTER);

    const cloudUrl = new URL(cloud?.url ?? '');
    const dataCenterUrl = new URL(dataCenter?.url ?? '');
    expect(cloudUrl.origin + cloudUrl.pathname).toBe('https://acme.atlassian.net/rest/api/2/search/jql');
    expect(cloudUrl.searchParams.get('jql')).toBe('project = A');
    expect(cloudUrl.searchParams.get('nextPageToken')).toBe('abc');
    expect(cloudUrl.searchParams.has('startAt')).toBe(false);
    expect(dataCenterUrl.origin + dataCenterUrl.pathname).toBe('https://jira.acme.com/jira/rest/api/2/search');
    expect(dataCenterUrl.searchParams.get('startAt')).toBe('5');
    expect(dataCenterUrl.searchParams.has('nextPageToken')).toBe(false);
  });

  it('posts the search body to the endpoint of each edition', async () => {
    const name = 'issues:issue_search:search_and_reconsile_issues_using_jql_post';

    const [cloud] = await sendTool(jira, name, { jql: 'project = A' }, JIRA_CLOUD);
    const [dataCenter] = await sendTool(jira, name, { jql: 'project = A' }, JIRA_DATA_CENTER);

    expect(cloud).toMatchObject({ method: 'POST', url: 'https://acme.atlassian.net/rest/api/2/search/jql' });
    expect(dataCenter).toMatchObject({ method: 'POST', url: 'https://jira.acme.com/jira/rest/api/2/search' });
    expect(dataCenter?.body).toMatchObject({ jql: 'project = A' });
  });

  it('sends the create_issue fields object as the nested body', async () => {
    const fields = { project: { key: 'A' }, summary: 'Broken', issuetype: { name: 'Task' } };

    const [request] = await sendTool(jira, 'issues:issues:create_issue', { fields }, JIRA_DATA_CENTER);

    expect(request?.method).toBe('POST');
    expect(request?.url).toMatch(/^https:\/\/jira\.acme\.com\/jira\/rest\/api\/2\/issue\?/);
    expect(request?.body).toEqual({ fields });
  });

  it('lists agile boards from the agile endpoint', async () => {
    const [request] = await sendTool(jira, 'software:board:get_all_boards', {}, JIRA_CLOUD);

    expect(request?.url).toMatch(/^https:\/\/acme\.atlassian\.net\/rest\/agile\/1\.0\/board\?/);
  });
});

describe('jira comments', () => {
  it('deletes a comment by issue key and comment id', async () => {
    const [request] = await sendTool(
      jira,
      'issues:issue_comments:delete_comment',
      { issueIdOrKey: 'A-1', id: '10' },
      JIRA_DATA_CENTER,
    );

    expect(request).toMatchObject({
      method: 'DELETE',
      url: 'https://jira.acme.com/jira/rest/api/2/issue/A-1/comment/10',
    });
  });
});

describe('confluence', () => {
  const page = { space: 'DOCS', title: 'Notes', body: '<p>Hi</p>', parent_id: '7' };

  it('creates pages through v1 on Data Center', async () => {
    const [request] = await sendTool(confluence, 'page:create', page, CONFLUENCE_DATA_CENTER);

    expect(request?.url).toBe('https://wiki.acme.com/rest/api/content');
    expect(request?.body).toEqual({
      type: 'page',
      title: 'Notes',
      space: { key: 'DOCS' },
      body: { storage: { value: '<p>Hi</p>', representation: 'storage' } },
      ancestors: [{ id: '7' }],
    });
  });

  it('creates pages through v2 on Cloud', async () => {
    const [request] = await sendTool(confluence, 'page:create', page, CONFLUENCE_CLOUD);

    expect(request?.url).toBe('https://acme.atlassian.net/wiki/api/v2/pages');
    expect(request?.body).toEqual({
      status: 'current',
      spaceId: 'DOCS',
      title: 'Notes',
      body: { value: '<p>Hi</p>', representation: 'storage' },
      parentId: '7',
    });
  });
});
