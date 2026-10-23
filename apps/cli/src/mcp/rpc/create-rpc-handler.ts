import type { ExecuteOptions, Manifest } from '@usemcpkit/core';
import { createRpcMethods } from '../methods/create-rpc-methods';
import { buildToolIndex } from '../tools/build-tool-index';
import type { RpcHandler } from '../types/rpc-handler';
import { dispatchRpcMessage } from './dispatch-rpc-message';

/** Maps one JSON-RPC message to its response, or null for notifications. */
export const createRpcHandler = (manifests: ReadonlyMap<string, Manifest>, options: ExecuteOptions = {}) => {
  const methods = createRpcMethods(buildToolIndex(manifests), options);
  const handler: RpcHandler = async (message) => {
    const response = await dispatchRpcMessage(methods, message);
    return message.id === undefined ? null : response;
  };
  return handler;
};
