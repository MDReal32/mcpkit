import type { FinalizedTools } from './finalized-tools.ts';
import type { Operation } from './operation.ts';
import type { PlannedTool } from './planned-tool.ts';
import type { SpecPlan } from './spec-plan.ts';

export interface GeneratorConfig<Result extends Operation> {
  serverName: string;
  serverDescription: string;
  /** Tool groups in the order the generated index lists them. */
  groups: string[];
  /** Ends the export name of each group's tool array; `GroupTools` when absent. */
  groupArraySuffix?: string;
  /** One plan per spec document; the Nth local path on the command line feeds the Nth plan. */
  specs: SpecPlan<Result>[];
  /** Checks or merges the planned tools before they are written; every tool is kept when absent. */
  finalizeTools?: (planned: PlannedTool<Result>[]) => FinalizedTools;
}
