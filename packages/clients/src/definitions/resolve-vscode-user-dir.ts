import { join } from 'node:path';
import type { ClientContext } from '../types/client-context';

export const resolveVscodeUserDir = (context: ClientContext, product: string) =>
  join(context.appDataDir, product, 'User');
