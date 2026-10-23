import { isJsonObject } from '../../../json';
import { findDuplicates } from '../find-duplicates';
import { validateTool } from './validate-tool';

export const validateTools = (tools: unknown, editionNames: ReadonlySet<string>) => {
  if (!Array.isArray(tools) || tools.length === 0) {
    return ['tools must be a non-empty array'];
  }
  const toolErrors = tools.flatMap((tool, index) => validateTool(tool, index, editionNames));
  const duplicates = findDuplicates(tools.map((tool) => (isJsonObject(tool) ? tool.name : undefined)));
  const duplicateErrors = duplicates.length ? [`duplicate tool names: ${duplicates.join(', ')}`] : [];
  return [...toolErrors, ...duplicateErrors];
};
