import { cleanDescription } from '../schema/clean-description';
import type { Operation } from '../types/operation';

export const describeOperation = ({ spec }: Operation, stripBold: boolean, prefix: string | undefined) => {
  const summary = (spec.summary ?? '').replace(/\.$/, '');
  const detail = cleanDescription(spec.description, stripBold);
  const text = detail && detail !== summary ? `${summary}. ${detail}` : summary;
  const labels = [prefix, spec.deprecated ? '[Deprecated]' : undefined].filter((label) => label !== undefined);
  return [...labels, text].join(' ');
};
