import type { FallbackAuth, Manifest } from '../../manifest';
import { readFallbackValues } from '../credentials/resolve/read-fallback-values';
import type { AuthContext } from '../types/auth-context';
import { resolveStaticAuth } from './resolve-static-auth';

export const resolveFallbackAuth = async (auth: FallbackAuth, manifest: Manifest, context: AuthContext) =>
  resolveStaticAuth(auth, manifest.name, await readFallbackValues(auth, manifest, context));
