import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { useTempDir } from '@mcpkit/testing';
import { describe, expect, it } from 'vitest';
import type { ClientDefinition, LaunchCommand } from '../src/main';
import { CLIENT_DEFINITIONS, createClientContext, detectClients, removeClientEntry, setClientEntry } from '../src/main';

const readHome = useTempDir('mcpkit-clients-');

const LAUNCH: LaunchCommand = { command: '/opt/mcpkit/bin/mcpkit', args: ['serve'] };

const findDefinition = (id: string) => {
  const definition = CLIENT_DEFINITIONS.find((candidate) => candidate.id === id);
  if (!definition) {
    throw new Error(`no client ${id}`);
  }
  return definition;
};

const createContext = () => createClientContext({}, 'linux', readHome());

const writeConfig = async (definition: ClientDefinition, text: string) => {
  const path = definition.configPath(createContext());
  await mkdir(join(path, '..'), { recursive: true });
  await writeFile(path, text);
  return path;
};

describe('detectClients', () => {
  it('finds clients by their directories and reports existing entries', async () => {
    await mkdir(join(readHome(), '.cursor'));
    await writeConfig(findDefinition('gemini-cli'), '{ "mcpServers": { "mcpkit": {} } }');

    const detected = await detectClients(createContext());

    expect(detected.map((client) => [client.definition.id, client.hasEntry])).toEqual([
      ['cursor', false],
      ['gemini-cli', true],
    ]);
  });

  it('reports unreadable configs as a problem instead of failing', async () => {
    await writeConfig(findDefinition('cursor'), '{ broken');

    const [cursor] = await detectClients(createContext());

    expect(cursor?.problem).toMatch(/invalid JSON/);
  });
});

describe('JSON client configs', () => {
  it('creates the config file with the client-specific entry shape', async () => {
    const definition = findDefinition('vscode');
    const path = definition.configPath(createContext());

    await setClientEntry(definition, path, LAUNCH);

    expect(JSON.parse(await readFile(path, 'utf8'))).toEqual({
      servers: { mcpkit: { type: 'stdio', command: LAUNCH.command, args: ['serve'] } },
    });
  });

  it('keeps comments and other keys, backs up, and removes only its entry', async () => {
    const definition = findDefinition('zed');
    const original = '{\n  // theme\n  "theme": "One Dark",\n  "context_servers": { "other": { "command": "x" } }\n}\n';
    const path = await writeConfig(definition, original);

    await setClientEntry(definition, path, LAUNCH);
    const written = await readFile(path, 'utf8');

    expect(written).toContain('// theme');
    expect(written).toContain('"other"');
    expect(written).toContain('"enabled": true');
    expect(await readFile(`${path}.mcpkit-backup`, 'utf8')).toBe(original);

    expect(await removeClientEntry(definition, path)).toBe(true);
    const removed = await readFile(path, 'utf8');
    expect(removed).not.toContain('mcpkit');
    expect(removed).toContain('// theme');
    expect(await removeClientEntry(definition, path)).toBe(false);
  });

  it('writes opencode commands as one array', async () => {
    const definition = findDefinition('opencode');
    const path = definition.configPath(createContext());

    await setClientEntry(definition, path, LAUNCH);

    expect(JSON.parse(await readFile(path, 'utf8')).mcp.mcpkit).toEqual({
      type: 'local',
      command: [LAUNCH.command, 'serve'],
      enabled: true,
    });
  });
});

describe('Codex TOML config', () => {
  const codex = findDefinition('codex');

  it('appends the table and replaces it in place later', async () => {
    const path = await writeConfig(codex, 'model = "o3" # pick\n\n[mcp_servers.other]\ncommand = "x"\n');

    await setClientEntry(codex, path, LAUNCH);
    await setClientEntry(codex, path, { command: 'C:\\mcpkit.exe', args: ['serve'] });

    expect(await readFile(path, 'utf8')).toBe(
      'model = "o3" # pick\n\n[mcp_servers.other]\ncommand = "x"\n\n' +
        '[mcp_servers.mcpkit]\ncommand = "C:\\\\mcpkit.exe"\nargs = ["serve"]\n',
    );
  });

  it('keeps user subtables on update and removes them with the entry', async () => {
    const path = await writeConfig(
      codex,
      '[mcp_servers.mcpkit]\ncommand = "old"\n\n[mcp_servers.mcpkit.env]\nA = "1"\n\n[profiles.x]\nmodel = "y"\n',
    );

    await setClientEntry(codex, path, LAUNCH);
    expect(await readFile(path, 'utf8')).toContain(
      `command = "${LAUNCH.command}"\nargs = ["serve"]\n\n[mcp_servers.mcpkit.env]`,
    );

    await removeClientEntry(codex, path);
    expect(await readFile(path, 'utf8')).toBe('[profiles.x]\nmodel = "y"\n');
  });

  it('refuses to edit an inline table entry', async () => {
    const path = await writeConfig(codex, '[mcp_servers]\nmcpkit = { command = "x" }\n');

    await expect(setClientEntry(codex, path, LAUNCH)).rejects.toThrow(/inline table/);
  });
});
