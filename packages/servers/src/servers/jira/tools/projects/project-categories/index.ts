import { projectsProjectCategoriesCreateProjectCategory } from './create-project-category';
import { projectsProjectCategoriesGetAllProjectCategories } from './get-all-project-categories';
import { projectsProjectCategoriesGetProjectCategoryById } from './get-project-category-by-id';
import { projectsProjectCategoriesRemoveProjectCategory } from './remove-project-category';
import { projectsProjectCategoriesUpdateProjectCategory } from './update-project-category';

export const projectsProjectCategoriesTools = [
  projectsProjectCategoriesCreateProjectCategory,
  projectsProjectCategoriesGetAllProjectCategories,
  projectsProjectCategoriesGetProjectCategoryById,
  projectsProjectCategoriesRemoveProjectCategory,
  projectsProjectCategoriesUpdateProjectCategory,
];
