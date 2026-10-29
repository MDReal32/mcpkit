import { docsDocsCreateADoc } from "./create-a-doc";
import { docsDocsCreateAPage } from "./create-a-page";
import { docsDocsEditAPage } from "./edit-a-page";
import { docsDocsFetchADoc } from "./fetch-a-doc";
import { docsDocsFetchPagelistingForADoc } from "./fetch-pagelisting-for-a-doc";
import { docsDocsFetchPagesBelongingToADoc } from "./fetch-pages-belonging-to-a-doc";
import { docsDocsGetPage } from "./get-page";
import { docsDocsSearchForDocs } from "./search-for-docs";

export const docsDocsTools = [
  docsDocsCreateADoc,
  docsDocsCreateAPage,
  docsDocsEditAPage,
  docsDocsFetchADoc,
  docsDocsFetchPagelistingForADoc,
  docsDocsFetchPagesBelongingToADoc,
  docsDocsGetPage,
  docsDocsSearchForDocs,
];
