import type { CategorizedOperation } from '../../../utils/types/categorized-operation';

export interface JiraOperation extends CategorizedOperation {
  /** Name of the spec source the operation comes from. */
  source: string;
}
