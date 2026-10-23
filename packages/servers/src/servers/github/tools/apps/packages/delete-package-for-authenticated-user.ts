import { defineTool } from "@usemcpkit/core";

export const appsPackagesDeletePackageForAuthenticatedUser = defineTool({
  name: "apps:packages:delete_package_for_authenticated_user",
  description:
    "Delete a package for the authenticated user. Deletes a package owned by the authenticated user. You cannot delete a public package if any version of the package has more than 5,000 downloads. In this scenario, contact GitHub support for further assistance.",
  input: {
    type: "object",
    properties: {
      package_type: {
        type: "string",
        enum: ["npm", "maven", "rubygems", "docker", "nuget", "container"],
        description:
          "The type of supported package. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry.",
      },
      package_name: {
        type: "string",
        description: "The name of the package.",
      },
    },
    required: ["package_type", "package_name"],
  },
  request: {
    method: "DELETE",
    path: "/user/packages/{package_type}/{package_name}",
  },
});
