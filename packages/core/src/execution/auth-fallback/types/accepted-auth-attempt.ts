import type { ToolSpec } from '../../../manifest';

export interface AcceptedAuthAttempt {
  accepted: true;
  response: Response;
  /** The tool as sent: its request and response mapping follow the edition of the domain that was used. */
  tool: ToolSpec;
}
