import { mkdir, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { useTempDir } from '@usemcpkit/testing';
import { describe, expect, it } from 'vitest';
import { compileServers } from '../plugins/manifests';

const readDir = useTempDir('mcpkit-servers-');

const VALID_DEFINITION = {
  category: 'test',
  version: '1.0.0',
  baseUrl: 'https://api.example.com',
  tools: [{ name: 'ping', description: 'Ping', input: { type: 'object' }, request: { method: 'GET', path: '/ping' } }],
};

const writeServer = async (dir: string, source: string) => {
  await mkdir(join(readDir(), dir), { recursive: true });
  await writeFile(join(readDir(), dir, `${dir}.ts`), source);
};

describe('compileServers', () => {
  it('compiles src/servers into valid JSON manifests', async () => {
    const { compiled, errors, dependencies } = await compileServers(resolve('src/servers'));

    expect(errors).toEqual([]);
    expect(compiled.map(({ manifest }) => manifest.name)).toEqual(['confluence', 'github', 'gitlab', 'jira']);
    const github = compiled.find(({ manifest }) => manifest.name === 'github');
    expect(JSON.parse(github?.json ?? 'null')).toEqual(github?.manifest);
    expect(github?.manifest.tools.find((tool) => tool.name === 'create_issue')?.input.required).toEqual([
      'owner',
      'repo',
      'title',
    ]);
    expect(dependencies.some((dependency) => dependency.endsWith('src/sdk/index.ts'))).toBe(true);
  });

  it('maps dashes in folder names to underscores in server names', async () => {
    await writeServer('my-api', `export const myApi = ${JSON.stringify({ name: 'my_api', ...VALID_DEFINITION })};\n`);

    const { compiled, errors } = await compileServers(readDir());

    expect(errors).toEqual([]);
    expect(compiled.map(({ manifest }) => manifest.name)).toEqual(['my_api']);
  });

  it('reports invalid definitions, name mismatches, export problems and missing entries per folder', async () => {
    await writeServer('broken', "export const broken = { name: 'broken', version: '1.0.0' };\n");
    await writeServer('other', `export const other = ${JSON.stringify({ name: 'renamed', ...VALID_DEFINITION })};\n`);
    await writeServer('twice', 'export const a = 1;\nexport const b = 2;\n');
    await mkdir(join(readDir(), 'empty'));

    const { compiled, errors } = await compileServers(readDir());

    expect(compiled).toEqual([]);
    expect(errors).toEqual([
      'broken: category must match /^[a-z][a-z0-9-]*$/',
      'broken: baseUrl must be an https:// URL',
      'broken: tools must be a non-empty array',
      'empty: missing entry file empty/empty.ts',
      'other: name "renamed" must match folder name "other" (expected "other")',
      expect.stringMatching(/^twice: failed to load .*expected exactly one named export, found 2 \(a, b\)$/),
    ]);
  });
});
