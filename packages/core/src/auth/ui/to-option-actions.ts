import type { UiAction, UiSpec } from '../../manifest';
import { fillTemplate } from '../../manifest';

/** `{server}` is known when the form opens; the domain can still change while it is open. A CLI prints one token. */
export const toOptionActions = (ui: UiSpec | undefined, serverName: string, fieldCount: number) =>
  (ui?.actions ?? []).flatMap((action): UiAction[] => {
    if (action.type === 'cli') {
      return fieldCount === 1 ? [action] : [];
    }
    return [{ ...action, url: fillTemplate(action.url, { server: encodeURIComponent(serverName) }) }];
  });
