import { describeError } from '@mcpkit/core';
import { readConfigText } from '../config/read-config-text';
import { hasClientEntry } from '../entry/has-client-entry';
import type { ClientContext } from '../types/client-context';
import type { ClientDefinition } from '../types/client-definition';
import type { DetectedClient } from '../types/detected-client';

export const inspectClient = async (definition: ClientDefinition, context: ClientContext) => {
  const configPath = definition.configPath(context);
  try {
    const text = await readConfigText(configPath);
    const client: DetectedClient = {
      definition,
      configPath,
      hasEntry: hasClientEntry(definition, text, configPath),
    };
    return client;
  } catch (error) {
    const client: DetectedClient = {
      definition,
      configPath,
      hasEntry: false,
      problem: describeError(error),
    };
    return client;
  }
};
