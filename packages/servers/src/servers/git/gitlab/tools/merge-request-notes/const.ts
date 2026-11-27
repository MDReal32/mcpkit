export const PROJECT_ID_PROPERTY = {
  type: "string",
  description: "The ID or URL-encoded path of the project, such as group%2Fproject.",
} as const;

export const MERGE_REQUEST_IID_PROPERTY = {
  type: "integer",
  description: "The internal ID (IID) of the merge request, the number shown as !123.",
} as const;

export const NOTE_ID_PROPERTY = { type: "integer", description: "The ID of the note." } as const;

export const DISCUSSION_ID_PROPERTY = { type: "string", description: "The ID of the discussion." } as const;

export const PAGE_PROPERTY = { type: "integer", description: "Page of results, from 1." } as const;

export const PER_PAGE_PROPERTY = { type: "integer", description: "Results per page, at most 100." } as const;

export const SORT_PROPERTY = { type: "string", description: "asc or desc; desc by default." } as const;

export const ORDER_BY_PROPERTY = {
  type: "string",
  description: "created_at or updated_at; created_at by default.",
} as const;
