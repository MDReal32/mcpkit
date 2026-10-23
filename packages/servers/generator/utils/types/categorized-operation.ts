import type { Operation } from './operation.ts';

export interface CategorizedOperation extends Operation {
  category: string;
}
