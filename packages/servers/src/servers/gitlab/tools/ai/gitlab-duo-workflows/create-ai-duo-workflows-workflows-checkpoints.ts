import { defineTool } from '@usemcpkit/core';

export const aiGitlabDuoWorkflowsCreateAiDuoWorkflowsWorkflowsCheckpoints = defineTool({
  name: 'ai:gitlab_duo_workflows:create_ai_duo_workflows_workflows_checkpoints',
  description: 'Create workflow checkpoint. Creates a new checkpoint state for an active workflow execution.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'ID of the workflow.',
      },
      thread_ts: {
        type: 'string',
        description: 'LangGraph `thread_ts` of the checkpoint.',
      },
      parent_ts: {
        type: 'string',
        description: 'The parent ts',
      },
      checkpoint_ns: {
        type: 'string',
        description:
          "LangGraph checkpoint namespace this checkpoint belongs to. Omitted (or blank) for the flow's own top-level checkpoint lineage. Set to LangGraph's namespace string for one nested subgraph invocation, for example a delegated subagent dispatched by `DelegationNode`.",
      },
      checkpoint: {
        type: 'object',
        description: 'Checkpoint content',
      },
      compressed_checkpoint: {
        type: 'string',
        description: 'Checkpoint content zlib compressed and base64 encoded',
      },
      metadata: {
        type: 'object',
        description: 'Checkpoint metadata.',
      },
      model_metadata_json: {
        type: 'string',
        description: 'JSON string of the model metadata.',
      },
      flow_metadata_json: {
        type: 'string',
        description: 'JSON string of the flow metadata.',
      },
      current_thread: {
        type: 'integer',
        description: 'Hint used to group blobs by thread during checkpoint reconstruction.',
        default: 0,
      },
      channel_keys: {
        type: 'array',
        description: 'Live channel membership of the checkpoint.',
        items: {
          type: 'string',
        },
      },
      channel_blobs: {
        type: 'array',
        description: 'Per-channel blobs for incremental checkpoint storage.',
        items: {
          type: 'object',
          properties: {
            channel: {
              type: 'string',
              description: 'Name of the channel.',
            },
            version: {
              type: 'string',
              description: 'Version of the channel.',
            },
            write_type: {
              type: 'string',
              description:
                'Blob serialization type. The read path decodes zlib-compressed JSON, so producers must send "json".',
            },
            step_action: {
              type: 'string',
              description:
                'Whether the blob is appended to the stored channel data (`conversation`) or replaces it (`compaction`).',
              enum: ['conversation', 'compaction'],
            },
            data: {
              type: 'string',
              description: 'Base64-encoded blob bytes.',
            },
          },
          required: ['channel', 'version', 'write_type', 'step_action', 'data'],
        },
      },
    },
    required: ['id', 'thread_ts', 'metadata'],
  },
  request: {
    method: 'POST',
    path: '/ai/duo_workflows/workflows/{id}/checkpoints',
    body: [
      'thread_ts',
      'parent_ts',
      'checkpoint_ns',
      'checkpoint',
      'compressed_checkpoint',
      'metadata',
      'model_metadata_json',
      'flow_metadata_json',
      'current_thread',
      'channel_keys',
      'channel_blobs',
    ],
  },
});
