import type { UiAction } from "@usemcpkit/core";

export interface VisibleAction {
  index: number;
  type: UiAction["type"];
  label: string;
  href?: string;
}
