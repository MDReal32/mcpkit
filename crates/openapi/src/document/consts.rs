/// Swagger 2.0 locations and where OpenAPI 3 keeps the same things.
pub const SWAGGER2_REFERENCE_PREFIXES: [(&str, &str); 3] = [
    ("#/definitions/", "#/components/schemas/"),
    ("#/parameters/", "#/components/parameters/"),
    ("#/responses/", "#/components/responses/"),
];

pub const OPENAPI_VERSION: &str = "3.0.3";

/// The node limit of a YAML document: GitLab's is about half a million nodes.
pub const MAX_YAML_NODES: usize = 20_000_000;

/// Parameter fields that describe the parameter, not its value; what is left of a Swagger 2.0 parameter is its schema.
pub const SWAGGER2_PARAMETER_FIELDS: [&str; 6] = [
    "name",
    "in",
    "required",
    "description",
    "collectionFormat",
    "allowEmptyValue",
];

/// Operation fields that read the same in Swagger 2.0 and OpenAPI 3.
pub const SWAGGER2_COPIED_FIELDS: [&str; 7] = [
    "tags",
    "summary",
    "description",
    "operationId",
    "deprecated",
    "security",
    "externalDocs",
];
