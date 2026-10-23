import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { createPingManifest, useTempDir } from '@mcpkit/testing';
import { describe, expect, it } from 'vitest';
import type { AuthSpec, ExecuteOptions } from '../src/main';
import { AuthError, executeTool, validateManifest } from '../src/main';
import { approveSignIn } from './fixtures/approve-sign-in';
import { createTokenCheckingFetch } from './fixtures/create-token-checking-fetch';
import { DEMO_TOKEN_URL, demoOAuth } from './fixtures/demo-oauth';

const readHome = useTempDir('mcpkit-auth-fallback-');

const authList: readonly AuthSpec[] = [
  demoOAuth,
  { type: 'bearer', env: 'FIRST_TOKEN' },
  { type: 'bearer', env: 'SECOND_TOKEN' },
];

const createPing = (serverName: string, validToken: string, options: ExecuteOptions) => {
  const { tokenCheckingFetch, sentAuthorizations } = createTokenCheckingFetch(validToken, {
    [DEMO_TOKEN_URL]: { access_token: 'signed-in', token_type: 'bearer', refresh_token: 'rt-1' },
  });
  const manifest = createPingManifest('1.0.0', '', serverName, authList);
  const [tool] = manifest.tools;
  if (!tool) {
    throw new Error('ping manifest has no tool');
  }
  const call = () =>
    executeTool(
      manifest,
      tool,
      {},
      {
        ...options,
        env: { MCPKIT_HOME: readHome(), ...options.env },
        fetchImpl: tokenCheckingFetch,
      },
    );
  return { call, sentAuthorizations };
};

const storeToken = async (serverName: string, accessToken: string) => {
  const tokens = { [serverName]: { accessToken, tokenType: 'bearer', expiresAt: Date.now() + 3_600_000 } };
  await writeFile(join(readHome(), 'tokens.json'), JSON.stringify(tokens));
};

const readTokens = async () => {
  const data: unknown = JSON.parse(await readFile(join(readHome(), 'tokens.json'), 'utf8'));
  return data;
};

const failSignIn = () => {
  throw new Error('sign-in must not start');
};

describe('auth list validation', () => {
  it('accepts OAuth2 entries followed by env-based fallbacks', () => {
    expect(validateManifest(createPingManifest('1.0.0', '', 'demo', authList))).toEqual([]);
  });

  it('accepts fallbacks without OAuth2', () => {
    expect(validateManifest(createPingManifest('1.0.0', '', 'demo', [{ type: 'bearer', env: 'T' }]))).toEqual([]);
  });

  it('rejects an empty list, a fallback before OAuth2 and entries after none', () => {
    expect(validateManifest({ ...createPingManifest('1.0.0'), auth: [] })).toEqual([
      'auth must be a non-empty array, tried from top to bottom',
    ]);
    expect(
      validateManifest(
        createPingManifest('1.0.0', '', 'demo', [demoOAuth, { type: 'none' }, { type: 'bearer', env: 'T' }, demoOAuth]),
      ),
    ).toEqual(['auth: fallback entries must come after every oauth entry', 'auth: "none" can only be the last entry']);
  });
});

describe('auth fallback', () => {
  it('uses the tokens.json token first', async () => {
    await storeToken('stored_first', 'stored');
    const { call, sentAuthorizations } = createPing('stored_first', 'stored', {
      env: { FIRST_TOKEN: 'first' },
      onAuthorizationUrl: failSignIn,
    });

    expect(await call()).toEqual({ pong: true });
    expect(sentAuthorizations).toEqual(['Bearer stored']);
  });

  it('uses a provided fallback instead of signing in, moves past a 401 and remembers the winner', async () => {
    const { call, sentAuthorizations } = createPing('falls_back', 'second', {
      env: { FIRST_TOKEN: 'revoked', SECOND_TOKEN: 'second' },
      onAuthorizationUrl: failSignIn,
    });

    expect(await call()).toEqual({ pong: true });
    expect(sentAuthorizations).toEqual(['Bearer revoked', 'Bearer second']);

    expect(await call()).toEqual({ pong: true });
    expect(sentAuthorizations).toEqual(['Bearer revoked', 'Bearer second', 'Bearer second']);
  });

  it('signs in with OAuth2 when no fallback is provided and keeps the token for the next call', async () => {
    const authorizationUrls: string[] = [];
    const { call, sentAuthorizations } = createPing('signs_in', 'signed-in', {
      onAuthorizationUrl: (url) => {
        authorizationUrls.push(url);
        approveSignIn(url);
      },
    });

    expect(await call()).toEqual({ pong: true });
    expect(await call()).toEqual({ pong: true });

    expect(authorizationUrls).toHaveLength(1);
    expect(sentAuthorizations).toEqual(['Bearer signed-in', 'Bearer signed-in']);
    expect(await readTokens()).toMatchObject({
      signs_in: { accessToken: 'signed-in', authKey: `oauth ${DEMO_TOKEN_URL}` },
    });
  });

  it('lists every option when none works', async () => {
    const { call } = createPing('none_works', 'unknown', { env: { FIRST_TOKEN: 'revoked' } });

    const calling = call();

    await expect(calling).rejects.toThrow(AuthError);
    await expect(calling).rejects.toThrow(
      [
        'none_works: no auth option worked',
        '  tokens.json: none_works: not signed in yet',
        '  auth[1] bearer FIRST_TOKEN: API answered 401: Bad credentials',
        '  auth[2] bearer SECOND_TOKEN: none_works: missing credential, set the SECOND_TOKEN environment variable or enter it in the credentials form',
        '  auth[0] oauth pkce sign-in: none_works: sign-in needs a browser, which this caller does not provide',
      ].join('\n'),
    );
  });
});
