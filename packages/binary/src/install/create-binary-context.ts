import type { Env } from '@usemcpkit/core';
import { detectTarget } from '../platform';
import type { BinaryContext } from '../types/binary-context';

export const createBinaryContext = async (env: Env = process.env, fetchImpl: typeof fetch = fetch) => {
  const target = await detectTarget();
  if (!target) {
    throw new Error(`no mcpkit binary is built for ${process.platform}-${process.arch}`);
  }
  const context: BinaryContext = { target, env, fetchImpl };
  return context;
};
