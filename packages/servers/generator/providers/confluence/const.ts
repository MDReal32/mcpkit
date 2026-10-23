import { DEFAULT_SCHEMA_OPTIONS } from '../../utils/schema/const';
import type { BodyReasonOptions } from '../../utils/types/body-reason-options';
import type { SchemaOptions } from '../../utils/types/schema-options';
import type { SpecSource } from './types/spec-source';

export const DATA_CENTER_VERSION = '10.2.19';

export const SPEC_SOURCES: readonly SpecSource[] = [
  {
    group: 'cloud',
    descriptionPrefix: '[Cloud]',
    url: 'https://dac-static.atlassian.com/cloud/confluence/openapi-v2.v3.json',
    apiRoot: '/wiki/api/v2',
    specPathPrefix: '/wiki/api/v2',
    naming: 'operation-id',
  },
  {
    group: 'cloud-v1',
    descriptionPrefix: '[Cloud v1]',
    url: 'https://developer.atlassian.com/cloud/confluence/swagger.v3.json',
    apiRoot: '/wiki/rest/api',
    specPathPrefix: '',
    naming: 'operation-id',
  },
  {
    group: 'datacenter',
    descriptionPrefix: '[Data Center]',
    url: `https://developer.atlassian.com/server/confluence/${DATA_CENTER_VERSION}.swagger.v3.json`,
    apiRoot: '/rest/api',
    specPathPrefix: '',
    naming: 'path',
  },
];

export const SCHEMA_OPTIONS: SchemaOptions = {
  ...DEFAULT_SCHEMA_OPTIONS,
  maxDepth: 2,
  includeDefaults: false,
  stripBold: true,
};

export const BODY_REASON_OPTIONS: BodyReasonOptions = {
  schema: SCHEMA_OPTIONS,
  noNamedPropertiesReason:
    'request body is an array or free-form object, only objects with named properties are supported',
  rejectsDottedNames: true,
};

/** A resource folder named `index` would shadow the `index.ts` that lists the folder's siblings. */
export const RESOURCE_RENAMES: Readonly<Record<string, string>> = {
  index: 'index-management',
};

export const PATH_VERBS: Readonly<Record<string, string>> = {
  get: 'get',
  post: 'create',
  put: 'update',
  patch: 'patch',
  delete: 'delete',
};

export const LIST_VERB = 'list';

export const SERVER_NAME = 'confluence';

export const SERVER_DESCRIPTION =
  "Confluence REST API for Cloud and Data Center. Tools are named '<group>:<resource>:<action>': group cloud is Cloud REST v2 (/wiki/api/v2), cloud_v1 is Cloud REST v1 (/wiki/rest/api) and datacenter is Data Center / Server REST (/rest/api); call the group that matches the configured host.";
