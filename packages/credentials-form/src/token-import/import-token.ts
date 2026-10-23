import type { IncomingMessage, ServerResponse } from 'node:http';
import type { TokenCredentialResponse } from '@mcpkit/core';
import { describeError } from '@mcpkit/core';
import { readJsonBody } from '../server/read-json-body';
import { sendJson } from '../server/send-json';
import type { FormSession } from '../types/form-session';
import { prepareTokenImport } from './prepare-token-import';
import { readCliToken } from './read-cli-token';

/** Answers the form with a token from the provider's CLI, so the token never passes through the page. */
export const importToken = async (session: FormSession, incoming: IncomingMessage, response: ServerResponse) => {
  let answer: TokenCredentialResponse;
  try {
    const plan = prepareTokenImport(session.request, await readJsonBody(incoming));
    answer = {
      method: 'token',
      option: plan.option,
      values: { [plan.key]: await readCliToken(plan.cli) },
      ...(plan.domain === undefined ? {} : { domain: plan.domain }),
    };
  } catch (error) {
    sendJson(response, 400, { errors: [describeError(error)] });
    return;
  }
  sendJson(response, 200, {});
  session.answer(answer);
};
