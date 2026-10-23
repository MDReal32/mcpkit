import type { ExecuteOptions } from '@usemcpkit/core';
import { describeError, executeTool } from '@usemcpkit/core';
import { createTextContent } from '../rpc/create-text-content';
import { findToolEntry } from '../tools/find-tool-entry';
import { readToolArguments } from '../tools/read-tool-arguments';
import type { RpcParams } from '../types/rpc-params';
import type { ToolIndex } from '../types/tool-index';

/** Tool failures are returned to the model as isError results, not protocol errors. */
export const createCallTool = (tools: ToolIndex, options: ExecuteOptions) => async (params: RpcParams | undefined) => {
  const { manifest, tool } = findToolEntry(tools, params);
  const args = readToolArguments(params);
  try {
    const result = await executeTool(manifest, tool, args, options);
    return { content: createTextContent(JSON.stringify(result, null, 2)) };
  } catch (error) {
    return { content: createTextContent(describeError(error)), isError: true };
  }
};
