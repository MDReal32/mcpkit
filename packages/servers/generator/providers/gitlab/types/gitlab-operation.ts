import type { CategorizedOperation } from '../../../utils/types/categorized-operation';

export interface GitlabOperation extends CategorizedOperation {
  returnsArray: boolean;
}
