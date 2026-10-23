import type { CategorizedOperation } from '../../../utils/types/categorized-operation.ts';

export interface GitlabOperation extends CategorizedOperation {
  returnsArray: boolean;
}
