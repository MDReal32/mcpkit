import { join } from 'node:path';
import type { ClientContext } from '../types/client-context';
import { resolveVscodeUserDir } from './resolve-vscode-user-dir';

export const resolveRooStorageDir = (context: ClientContext) =>
  join(resolveVscodeUserDir(context, 'Code'), 'globalStorage', 'rooveterinaryinc.roo-cline');
