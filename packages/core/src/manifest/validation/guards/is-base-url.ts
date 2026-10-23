import { DOMAIN_SAMPLE_VALUE } from '../../const';
import { fillDomain } from '../../domain/fill-domain';
import { isHttpsUrl } from './is-https-url';

export const isBaseUrl = (value: unknown) => isHttpsUrl(value) && URL.canParse(fillDomain(value, DOMAIN_SAMPLE_VALUE));
