import { defineTool } from '@usemcpkit/core';

export const reposReposUpdateInformationAboutPagesSite = defineTool({
  name: 'repos:repos:update_information_about_pages_site',
  description:
    'Update information about a GitHub Pages site. Updates information for a GitHub Pages site. For more information, see "About GitHub Pages.',
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
      cname: {
        type: 'string',
        description:
          'Specify a custom domain for the repository. Sending a `null` value will remove the custom domain. For more about custom domains, see "Using a custom domain with GitHub Pages."',
      },
      https_enforced: {
        type: 'boolean',
        description: 'Specify whether HTTPS should be enforced for the repository.',
      },
      build_type: {
        type: 'string',
        description:
          'The process by which the GitHub Pages site will be built. `workflow` means that the site is built by a custom GitHub Actions workflow. `legacy` means that the site is built by GitHub when changes are pushed to a specific branch.',
        enum: ['legacy', 'workflow'],
      },
      source: {
        type: 'object',
        properties: {
          branch: {
            type: 'string',
            description: "The repository branch used to publish your site's source files.",
          },
          path: {
            type: 'string',
            description:
              'The repository directory that includes the source files for the Pages site. Allowed paths are `/` or `/docs`.',
            enum: ['/', '/docs'],
          },
        },
      },
    },
    required: ['owner', 'repo'],
  },
  request: {
    method: 'PUT',
    path: '/repos/{owner}/{repo}/pages',
    body: ['cname', 'https_enforced', 'build_type', 'source'],
  },
});
