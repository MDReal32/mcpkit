import type { JsonSchema } from '@usemcpkit/core';
import type { ToolDefinition } from '../../utils/types/tool-definition';
import { CLOUD_EDITION, CLOUD_ONLY_SUFFIX, DATA_CENTER_ONLY_SUFFIX } from './const';

const annotate = (schema: JsonSchema, suffix: string) => ({
  ...schema,
  description: schema.description ? `${schema.description} ${suffix}` : suffix,
});

/**
 * One tool for two endpoints: the Data Center request is the default, the Cloud request is the `cloud` edition. The
 * input is the union of both; an argument only one deployment reads is marked, and only arguments both require stay
 * required.
 */
export const mergeEditionDefinitions = (cloud: ToolDefinition, dataCenter: ToolDefinition) => {
  const cloudProperties = cloud.input.properties ?? {};
  const dataCenterProperties = dataCenter.input.properties ?? {};
  const properties: Record<string, JsonSchema> = {};
  for (const [name, schema] of Object.entries(cloudProperties)) {
    properties[name] = name in dataCenterProperties ? schema : annotate(schema, CLOUD_ONLY_SUFFIX);
  }
  for (const [name, schema] of Object.entries(dataCenterProperties)) {
    if (!(name in cloudProperties)) {
      properties[name] = annotate(schema, DATA_CENTER_ONLY_SUFFIX);
    }
  }
  const required = (cloud.input.required ?? []).filter((name) => dataCenter.input.required?.includes(name));
  const merged: ToolDefinition = {
    name: cloud.name,
    description: cloud.description,
    input: { type: 'object', properties, ...(required.length > 0 && { required }) },
    request: dataCenter.request,
    editions: { [CLOUD_EDITION]: { request: cloud.request } },
  };
  return merged;
};
