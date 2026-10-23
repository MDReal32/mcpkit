import type { Manifest } from '@usemcpkit/core';
import { defineServer } from '@usemcpkit/core';
import { JIRA_BASE } from './const';

export const defineJiraServer = (server: Pick<Manifest, 'name' | 'description' | 'tools'>) =>
  defineServer({ ...JIRA_BASE, ...server });
