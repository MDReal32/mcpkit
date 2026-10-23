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
    const [saas] = await sendTool(gitlab, 'issue:get', { project: 'acme/app', issue_iid: 7 }, { GITLAB_TOKEN: 't' });
    const [selfManaged] = await sendTool(
      gitlab,
      'issue:list',
      { project: 'acme/sub/app', state: 'opened' },
      { GITLAB_HOST: 'git.acme.com/gitlab', GITLAB_TOKEN: 't' },
    );

    expect(saas?.url).toBe('https://gitlab.com/api/v4/projects/acme%2Fapp/issues/7');
    expect(selfManaged?.url).toMatch(
      /^https:\/\/git\.acme\.com\/gitlab\/api\/v4\/projects\/acme%2Fsub%2Fapp\/issues\?state=opened/,
    );
  });

  it('lists member projects and posts comment bodies', async () => {
    const [projects] = await sendTool(gitlab, 'project:list', { search: 'app' }, { GITLAB_TOKEN: 't' });
    const [comment] = await sendTool(
      gitlab,
      'merge_request:add_comment',
      { project: 'acme/app', merge_request_iid: 3, body: 'LGTM' },
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
  it('searches with the endpoint of each edition', async () => {
    const args = { jql: 'project = A' };

    const [cloud] = await sendTool(jira, 'issue:search', args, JIRA_CLOUD);
    const [dataCenter] = await sendTool(jira, 'issue:search', args, JIRA_DATA_CENTER);

    expect(cloud?.url).toMatch(/^https:\/\/acme\.atlassian\.net\/rest\/api\/2\/search\/jql\?/);
    expect(dataCenter?.url).toMatch(/^https:\/\/jira\.acme\.com\/jira\/rest\/api\/2\/search\?/);
    expect(new URL(dataCenter?.url ?? '').searchParams.get('fields')).toBe(
      'summary,status,assignee,issuetype,priority,updated',
    );
  });

  it('nests the create_issue fields', async () => {
    const [request] = await sendTool(jira, 'issue:create', { project_key: 'A', summary: 'Broken' }, JIRA_DATA_CENTER);

    expect(request?.body).toEqual({
      fields: { project: { key: 'A' }, summary: 'Broken', issuetype: { name: 'Task' } },
    });
  });
});

describe('jira comments', () => {
  it('deletes a comment by issue key and comment id', async () => {
    const [request] = await sendTool(jira, 'comment:delete', { issue_key: 'A-1', comment_id: '10' }, JIRA_DATA_CENTER);

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
