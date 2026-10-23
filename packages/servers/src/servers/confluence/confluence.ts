import { defineConfluenceServer } from '../../providers/confluence';
import { confluenceTools } from './tools';

export const confluence = defineConfluenceServer({
  name: 'confluence',
  description:
    "Confluence REST API for Cloud and Data Center. Tools are named '<group>:<resource>:<action>': group cloud is Cloud REST v2 (/wiki/api/v2), cloud_v1 is Cloud REST v1 (/wiki/rest/api) and datacenter is Data Center / Server REST (/rest/api); call the group that matches the configured host.",
  tools: confluenceTools,
});
