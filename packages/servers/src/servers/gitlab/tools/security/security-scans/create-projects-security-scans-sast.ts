import { defineTool } from '@usemcpkit/core';

export const securitySecurityScansCreateProjectsSecurityScansSast = defineTool({
  name: 'security:security_scans:create_projects_security_scans_sast',
  description: 'Scan a file for vulnerabilities. Scans a specified file for security vulnerabilities using SAST.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      sast_endpoint: {
        type: 'string',
        description: 'Name of the SAST scanner service endpoint to call.',
      },
      file_path: {
        type: 'string',
        description: 'Path of the file to scan, relative to the project.',
      },
      content: {
        type: 'string',
        description: 'Content of the file to scan.',
      },
    },
    required: ['id', 'sast_endpoint', 'file_path', 'content'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/security_scans/sast/{sast_endpoint}',
    body: ['file_path', 'content'],
  },
});
