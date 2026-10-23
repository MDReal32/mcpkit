import { DOMAIN_PLACEHOLDER } from "../const";

export const fillDomain = (template: string, domain: string) => template.replaceAll(DOMAIN_PLACEHOLDER, domain);
