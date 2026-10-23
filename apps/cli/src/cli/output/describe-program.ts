import { AUTO_UPDATE_ENV, NPM_REGISTRY_ENV } from '@mcpkit/binary';
import { CLIENT_DEFINITIONS } from '@mcpkit/clients';

export const describeProgram = () => `mcpkit [command] — many MCP servers, one binary (no command means install)

Clients: ${CLIENT_DEFINITIONS.map((definition) => definition.id).join(', ')}

Environment:
- MCPKIT_HOME: config dir with bin/, manifests/, tokens.json, config.json and secrets.json (default ~/.mcpkit)
- MCPKIT_REGISTRY: manifest registry base URL used by "update"
- ${AUTO_UPDATE_ENV}=0: stop "serve" from updating the installed binary (checked once a day)
- ${NPM_REGISTRY_ENV}: npm registry for binary downloads (default https://registry.npmjs.org)`;
