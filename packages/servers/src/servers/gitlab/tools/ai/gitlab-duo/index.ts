import { aiGitlabDuoCreateAiLlmGitCommand } from "./create-ai-llm-git-command";
import { aiGitlabDuoCreateAiThirdPartyAgentsDirectAccess } from "./create-ai-third-party-agents-direct-access";
import { aiGitlabDuoCreateChatCompletions } from "./create-chat-completions";
import { aiGitlabDuoCreateDuoCodeReviewEvaluations } from "./create-duo-code-review-evaluations";

export const aiGitlabDuoTools = [
  aiGitlabDuoCreateAiLlmGitCommand,
  aiGitlabDuoCreateAiThirdPartyAgentsDirectAccess,
  aiGitlabDuoCreateChatCompletions,
  aiGitlabDuoCreateDuoCodeReviewEvaluations,
];
