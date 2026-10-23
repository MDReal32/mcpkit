import { aiOrbitCreateOrbitContext } from './create-orbit-context';
import { aiOrbitCreateOrbitQuery } from './create-orbit-query';
import { aiOrbitCreateOrbitQueryPost } from './create-orbit-query-post';
import { aiOrbitGetOrbitSchema } from './get-orbit-schema';
import { aiOrbitGetOrbitSkills } from './get-orbit-skills';
import { aiOrbitGetOrbitSkillsGet } from './get-orbit-skills-get';
import { aiOrbitGetOrbitStatus } from './get-orbit-status';
import { aiOrbitListOrbitQueryTemplates } from './list-orbit-query-templates';
import { aiOrbitListOrbitSkills } from './list-orbit-skills';
import { aiOrbitListOrbitTools } from './list-orbit-tools';

export const aiOrbitTools = [
  aiOrbitCreateOrbitContext,
  aiOrbitCreateOrbitQuery,
  aiOrbitCreateOrbitQueryPost,
  aiOrbitGetOrbitSchema,
  aiOrbitGetOrbitSkills,
  aiOrbitGetOrbitSkillsGet,
  aiOrbitGetOrbitStatus,
  aiOrbitListOrbitQueryTemplates,
  aiOrbitListOrbitSkills,
  aiOrbitListOrbitTools,
];
