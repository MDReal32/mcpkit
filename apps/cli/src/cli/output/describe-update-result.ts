import type { UpdateResult } from '../../registry';

export const describeUpdateResult = (result: UpdateResult) => {
  switch (result.status) {
    case 'updated':
      return `updated ${result.name} -> ${result.version}`;
    case 'unchanged':
      return `${result.name} ${result.version} is up to date`;
    case 'rejected':
      return `rejected ${result.entry}: ${result.errors.join('; ')}`;
  }
};
