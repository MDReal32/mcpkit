import { defineTool } from '@usemcpkit/core';

export const ciRolloutsCreateRollouts = defineTool({
  name: 'ci:rollouts:create_rollouts',
  description:
    'Ingest a rollout workflow event. Reports flow-graph progress from the CD orchestrator (a Starlark workflow run by AutoFlow).',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the rollout',
      },
      topic: {
        type: 'string',
        description: 'The event topic',
      },
      type: {
        type: 'string',
        description: 'The event type',
      },
      data: {
        type: 'object',
        description: 'The event payload. Exactly one of `data`, `value` must be provided.',
        properties: {
          position: {
            type: 'array',
            description:
              'Zero-based path to the stage/step in the flow definition; required for every event except com.gitlab.cd.rollout_succeeded',
            items: {
              type: 'integer',
            },
          },
          stage_name: {
            type: 'string',
            description: 'Name of the enclosing stage (an environment tier); absent for a step outside any stage',
          },
          environment: {
            type: 'string',
            description:
              'Exact name of the target GitLab environment; resolves the rollout environment to update when a stage deploys to more than one environment',
          },
          step_type: {
            type: 'string',
            description: 'The step type, present on step_* events',
          },
          service: {
            type: 'string',
            description: 'Name of the Cd::Service, present on service_started/service_succeeded/service_failed',
          },
          error: {
            type: 'string',
            description: 'Failure detail, present on step_failed and service_failed',
          },
          reason: {
            type: 'string',
            description: 'Human-readable prompt, present on approval_requested',
          },
          reply: {
            type: 'string',
            description:
              'Name of the AutoFlow channel to post the approval decision back into, present on approval_requested',
          },
        },
      },
      value: {
        type: 'object',
        description:
          'AutoFlow Value (protojson), decoded into the same topic/type/data shape as `data` above. Exactly one of `data`, `value` must be provided.',
      },
      channel_tokens: {
        type: 'array',
        description: 'AutoFlow channels opened alongside this event, for posting a value back into them later',
        items: {
          type: 'object',
          properties: {
            channel_name: {
              type: 'string',
              description: 'Name of the AutoFlow channel',
            },
            token: {
              type: 'string',
              description: 'Token used to post a value into the channel',
            },
          },
          required: ['channel_name', 'token'],
        },
      },
    },
    required: ['id'],
  },
  request: {
    method: 'POST',
    path: '/rollouts/{id}',
    body: ['topic', 'type', 'data', 'value', 'channel_tokens'],
  },
});
