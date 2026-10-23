import { issuesToDosCreateProjectsIssuesTodo } from './create-projects-issues-todo';
import { issuesToDosCreateProjectsMergeRequestsTodo } from './create-projects-merge-requests-todo';
import { issuesToDosCreateTodosMarkAsDone } from './create-todos-mark-as-done';
import { issuesToDosCreateTodosMarkAsDonePost } from './create-todos-mark-as-done-post';
import { issuesToDosListTodos } from './list-todos';

export const issuesToDosTools = [
  issuesToDosCreateProjectsIssuesTodo,
  issuesToDosCreateProjectsMergeRequestsTodo,
  issuesToDosCreateTodosMarkAsDone,
  issuesToDosCreateTodosMarkAsDonePost,
  issuesToDosListTodos,
];
