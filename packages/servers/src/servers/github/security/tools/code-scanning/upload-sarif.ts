import { defineTool } from '@usemcpkit/core';

export const codeScanningUploadSarif = defineTool({
  name: 'code_scanning:upload_sarif',
  description:
    'Upload an analysis as SARIF data. Uploads SARIF data containing the results of a code scanning analysis to make the results available in a repository. For troubleshooting information, see "Troubleshooting SARIF uploads."',
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
      commit_sha: {
        type: 'string',
        description: 'The SHA of the commit to which the analysis you are uploading relates.',
      },
      ref: {
        type: 'string',
        description:
          'The full Git reference, formatted as `refs/heads/<branch name>`, `refs/tags/<tag>`, `refs/pull/<number>/merge`, or `refs/pull/<number>/head`.',
      },
      sarif: {
        type: 'string',
        description:
          'A Base64 string representing the SARIF file to upload. You must first compress your SARIF file using `gzip` and then translate the contents of the file into a Base64 encoding string. For more information, see "SARIF support for code scanning."',
      },
      checkout_uri: {
        type: 'string',
        description:
          'The base directory used in the analysis, as it appears in the SARIF file. This property is used to convert file paths from absolute to relative, so that alerts can be mapped to their correct location in the repository.',
      },
      started_at: {
        type: 'string',
        description:
          'The time that the analysis run began. This is a timestamp in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.',
      },
      tool_name: {
        type: 'string',
        description:
          'The name of the tool used to generate the code scanning analysis. If this parameter is not used, the tool name defaults to "API". If the uploaded SARIF contains a tool GUID, this will be available for filtering using the `tool_guid` parameter of operations such as `GET /repos/{owner}/{repo}/code-scanning/alerts`.',
      },
      validate: {
        type: 'boolean',
        description:
          'Whether the SARIF file will be validated according to the code scanning specifications. This parameter is intended to help integrators ensure that the uploaded SARIF files are correctly rendered by code scanning.',
      },
    },
    required: ['owner', 'repo', 'commit_sha', 'ref', 'sarif'],
  },
  request: {
    method: 'POST',
    path: '/repos/{owner}/{repo}/code-scanning/sarifs',
    body: ['commit_sha', 'ref', 'sarif', 'checkout_uri', 'started_at', 'tool_name', 'validate'],
  },
});
