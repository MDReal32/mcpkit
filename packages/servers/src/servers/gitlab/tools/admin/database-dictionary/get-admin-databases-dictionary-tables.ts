import { defineTool } from '@usemcpkit/core';

export const adminDatabaseDictionaryGetAdminDatabasesDictionaryTables = defineTool({
  name: 'admin:database_dictionary:get_admin_databases_dictionary_tables',
  description:
    'Retrieve dictionary details. Provides table schema and column information from the GitLab database dictionary.',
  input: {
    type: 'object',
    properties: {
      database_name: {
        type: 'string',
        enum: ['main', 'ci'],
        description: 'Name of the database.',
      },
      table_name: {
        type: 'string',
        description: 'Name of the table.',
      },
    },
    required: ['database_name', 'table_name'],
  },
  request: {
    method: 'GET',
    path: '/admin/databases/{database_name}/dictionary/tables/{table_name}',
  },
});
