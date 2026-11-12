use crate::OpenApiError;
use crate::consts::DEFAULT_MAX_DEPTH;
use indexmap::IndexMap;
use regex::Regex;
use usemcpkit_manifest::openapi::ConversionOptions;
use usemcpkit_manifest::tool::FixedValue;

/// A source's `options` with their defaults filled in and their patterns compiled.
pub struct Conversion {
    pub max_depth: u32,
    pub include_defaults: bool,
    pub strip_bold: bool,
    pub widen_mixed_scalars: bool,
    pub keeps_exploded_arrays: bool,
    pub description_prefix: Option<String>,
    pub download_paths: Vec<Regex>,
    pub file_part_name: Option<String>,
    pub skip: Vec<Regex>,
    pub skip_deprecated: bool,
    pub security: Option<Vec<String>>,
    pub fixed_query: Option<IndexMap<String, FixedValue>>,
}

fn compile_all(patterns: Option<&Vec<String>>, field: &str) -> Result<Vec<Regex>, OpenApiError> {
    patterns
        .into_iter()
        .flatten()
        .map(|pattern| {
            Regex::new(pattern).map_err(|error| {
                OpenApiError(format!(
                    "options.{field} \"{pattern}\" is not a regular expression: {error}"
                ))
            })
        })
        .collect()
}

impl Conversion {
    pub fn from_options(options: Option<&ConversionOptions>) -> Result<Self, OpenApiError> {
        let defaults = ConversionOptions::default();
        let options = options.unwrap_or(&defaults);
        Ok(Conversion {
            max_depth: options.max_depth.unwrap_or(DEFAULT_MAX_DEPTH),
            include_defaults: options.include_defaults.unwrap_or(true),
            strip_bold: options.strip_bold.unwrap_or(false),
            widen_mixed_scalars: options.widen_mixed_scalars.unwrap_or(false),
            keeps_exploded_arrays: options.keeps_exploded_arrays.unwrap_or(false),
            description_prefix: options.description_prefix.clone(),
            download_paths: compile_all(options.download_paths.as_ref(), "downloadPaths")?,
            file_part_name: options.file_part_name.clone(),
            skip: compile_all(options.skip.as_ref(), "skip")?,
            skip_deprecated: options.skip_deprecated.unwrap_or(false),
            security: options.security.clone(),
            fixed_query: options.fixed_query.clone(),
        })
    }
}
