import type { Manifest } from '@usemcpkit/core';
import { defineServer } from '@usemcpkit/core';
import { GITHUB_BASE } from './const';

export const defineGithubServer = (server: Pick<Manifest, 'name' | 'description' | 'tools'>) =>
  defineServer({ ...GITHUB_BASE, ...server });
