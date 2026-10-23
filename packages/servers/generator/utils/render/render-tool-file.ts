import type { GeneratedTool } from '../types/generated-tool';

export const renderToolFile = ({ identifier, definition }: GeneratedTool) =>
  `import { defineTool } from '@usemcpkit/core';

export const ${identifier} = defineTool(${JSON.stringify(definition, null, 2)});
`;
