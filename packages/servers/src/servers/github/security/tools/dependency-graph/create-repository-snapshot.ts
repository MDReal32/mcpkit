import { defineTool } from '@usemcpkit/core';

export const dependencyGraphCreateRepositorySnapshot = defineTool({
  name: 'dependency_graph:create_repository_snapshot',
  description:
    "Create a snapshot of dependencies for a repository. Create a new snapshot of a repository's dependencies.",
  input: {
    type: 'object',
    properties: {
      owner: {
        type: 'string',
        description: 'The account owner of the repository. The name is not case sensitive.',
      },
      repo: {
        type: 'string',
        description: 'The name of the repository without the `.git` extension. The name is not case sensitive.',
      },
      version: {
        type: 'integer',
        description: 'The version of the repository snapshot submission.',
      },
      job: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'The external ID of the job.',
          },
          correlator: {
            type: 'string',
            description:
              'Correlator provides a key that is used to group snapshots submitted over time. Only the "latest" submitted snapshot for a given combination of `job.correlator` and `detector.name` will be considered when calculating a repository\'s current dependencies. Correlator should be as unique as it takes to distinguish all detection runs for a given "wave" of CI workflow you run. If you\'re using GitHub Act…',
          },
          html_url: {
            type: 'string',
            description: 'The url for the job.',
          },
        },
        required: ['id', 'correlator'],
      },
      sha: {
        type: 'string',
        description: 'The commit SHA associated with this dependency snapshot. Maximum length: 64 characters.',
      },
      ref: {
        type: 'string',
        description: 'The repository branch that triggered this snapshot.',
      },
      detector: {
        type: 'object',
        description: 'A description of the detector used.',
        properties: {
          name: {
            type: 'string',
            description: 'The name of the detector used.',
          },
          version: {
            type: 'string',
            description: 'The version of the detector used.',
          },
          url: {
            type: 'string',
            description: 'The url of the detector used.',
          },
        },
        required: ['name', 'version', 'url'],
      },
      metadata: {
        type: 'object',
        description: 'User-defined metadata to store domain-specific information limited to 8 keys with scalar values.',
      },
      manifests: {
        type: 'object',
        description:
          'A collection of package manifests, which are a collection of related dependencies declared in a file or representing a logical group of dependencies.',
      },
      scanned: {
        type: 'string',
        description: 'The time at which the snapshot was scanned.',
      },
    },
    required: ['owner', 'repo', 'version', 'job', 'sha', 'ref', 'detector', 'scanned'],
  },
  request: {
    method: 'POST',
    path: '/repos/{owner}/{repo}/dependency-graph/snapshots',
    body: ['version', 'job', 'sha', 'ref', 'detector', 'metadata', 'manifests', 'scanned'],
  },
});
