import type { OpenApiDocument } from './open-api-operation.ts';
import type { Operation } from './operation.ts';
import type { OperationNames } from './operation-names.ts';
import type { ToolDefinition } from './tool-definition.ts';

export interface SpecPlan<Result extends Operation> {
  readDocument: (localPath: string | undefined) => Promise<OpenApiDocument>;
  collectOperations: (document: OpenApiDocument) => Result[];
  /** Names a skipped operation in the report. */
  describeOperation: (operation: Result) => string;
  findUnsupportedReason: (operation: Result) => string | undefined;
  /** One name per operation, in the order given. */
  nameOperations: (operations: Result[]) => OperationNames[];
  buildToolDefinition: (operation: Result, name: string) => ToolDefinition;
}
