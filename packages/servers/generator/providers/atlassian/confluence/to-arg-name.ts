/** Placeholders and argument names are word characters only; `page-id` becomes `page_id`. */
export const toArgName = (name: string) => name.replace(/\W/g, '_');
