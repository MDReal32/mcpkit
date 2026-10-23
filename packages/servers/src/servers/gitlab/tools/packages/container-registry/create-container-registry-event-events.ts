import { defineTool } from '@usemcpkit/core';

export const packagesContainerRegistryCreateContainerRegistryEventEvents = defineTool({
  name: 'packages:container_registry:create_container_registry_event_events',
  description:
    'Receives notifications from the container registry when an operation occurs. This feature was introduced in GitLab 12.10',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'POST',
    path: '/container_registry_event/events',
  },
});
