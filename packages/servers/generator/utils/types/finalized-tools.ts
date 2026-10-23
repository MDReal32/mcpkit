import type { GeneratedTool } from "./generated-tool";

export interface FinalizedTools {
  tools: GeneratedTool[];
  /** Printed after the skipped operations. */
  notes: string[];
}
