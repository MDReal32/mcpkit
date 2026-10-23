import type { Operation } from "./operation";

export interface CategorizedOperation extends Operation {
  category: string;
}
