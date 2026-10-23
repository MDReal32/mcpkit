import { defineTool } from '@usemcpkit/core';

export const reposReposGenerateReleaseNotes = defineTool({
  name: 'repos:repos:generate_release_notes',
  description:
    'Generate release notes content for a release. Generate a name and body describing a release. The body content will be markdown formatted and contain information like the changes since last release and users who contributed. The generated release notes are not saved anywhere. They are intended to be generated and used when creating a new release.',
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
      tag_name: {
        type: 'string',
        description: 'The tag name for the release. This can be an existing tag or a new one.',
      },
      target_commitish: {
        type: 'string',
        description:
          "Specifies the commitish value that will be the target for the release's tag. Required if the supplied tag_name does not reference an existing tag. Ignored if the tag_name already exists.",
      },
      previous_tag_name: {
        type: 'string',
        description:
          'The name of the previous tag to use as the starting point for the release notes. Use to manually specify the range for the set of changes considered as part this release.',
      },
      configuration_file_path: {
        type: 'string',
        description:
          "Specifies a path to a file in the repository containing configuration settings used for generating the release notes. If unspecified, the configuration file located in the repository at '.github/release.yml' or '.github/release.yaml' will be used. If that is not present, the default configuration will be used.",
      },
    },
    required: ['owner', 'repo', 'tag_name'],
  },
  request: {
    method: 'POST',
    path: '/repos/{owner}/{repo}/releases/generate-notes',
    body: ['tag_name', 'target_commitish', 'previous_tag_name', 'configuration_file_path'],
  },
});
