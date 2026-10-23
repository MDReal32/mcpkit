import type { UiAction } from '@mcpkit/core';

export interface VisibleAction {
  index: number;
  type: UiAction['type'];
  label: string;
  href?: string;
}
