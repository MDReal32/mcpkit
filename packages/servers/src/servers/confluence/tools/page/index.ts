import { createPage } from './create';
import { getPage } from './get';
import { getPageChildren } from './list-children';
import { updatePage } from './update';

export const pageTools = [createPage, getPage, getPageChildren, updatePage];
