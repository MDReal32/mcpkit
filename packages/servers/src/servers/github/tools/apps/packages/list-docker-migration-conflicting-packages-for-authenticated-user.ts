import { defineTool } from "@usemcpkit/core";

export const appsPackagesListDockerMigrationConflictingPackagesForAuthenticatedUser = defineTool({
  name: "apps:packages:list_docker_migration_conflicting_packages_for_authenticated_user",
  description:
    "Get list of conflicting packages during Docker migration for authenticated-user. Lists all packages that are owned by the authenticated user within the user's namespace, and that encountered a conflict during a Docker migration.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/user/docker/conflicts",
  },
});
