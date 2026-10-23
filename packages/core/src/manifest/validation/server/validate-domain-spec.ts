import { isJsonObject } from '../../../json';
import { DOMAIN_PLACEHOLDER } from '../../const';
import { isDomainValue } from '../../domain/is-domain-value';
import { readTemplatableUrls } from '../tool/read-templatable-urls';

export const validateDomainSpec = (manifest: Readonly<Record<string, unknown>>) => {
  const { domain } = manifest;
  const usesDomain = readTemplatableUrls(manifest).some((url) => url.includes(DOMAIN_PLACEHOLDER));
  if (domain === undefined) {
    return usesDomain ? [`domain is required when a URL uses ${DOMAIN_PLACEHOLDER}`] : [];
  }
  if (!isJsonObject(domain)) {
    return ['domain must be an object'];
  }
  const errors: string[] = [];
  if (!usesDomain) {
    errors.push(`domain is set but no URL uses ${DOMAIN_PLACEHOLDER}`);
  }
  if (domain.default !== undefined && !isDomainValue(domain.default)) {
    errors.push('domain.default must look like host[:port][/path]');
  }
  for (const key of ['label', 'env', 'hint', 'placeholder'] as const) {
    if (domain[key] !== undefined && typeof domain[key] !== 'string') {
      errors.push(`domain.${key} must be a string`);
    }
  }
  return errors;
};
