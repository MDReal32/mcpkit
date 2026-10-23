import { isJsonObject } from '../../../json';
import { EDITION_NAME_PATTERN } from '../../const';
import { isStringList } from '../guards/is-string-list';

export const validateEditions = (editions: unknown) => {
  if (editions === undefined) {
    return [];
  }
  if (!isJsonObject(editions)) {
    return ['editions must be an object'];
  }
  return Object.entries(editions).flatMap(([name, edition]) => {
    const location = `editions.${name}`;
    if (!EDITION_NAME_PATTERN.test(name)) {
      return [`${location}: name must match ${EDITION_NAME_PATTERN}`];
    }
    if (!isJsonObject(edition) || !isStringList(edition.hosts) || edition.hosts.length === 0) {
      return [`${location}.hosts must be a non-empty array of host suffixes`];
    }
    return edition.label === undefined || typeof edition.label === 'string'
      ? []
      : [`${location}.label must be a string`];
  });
};
