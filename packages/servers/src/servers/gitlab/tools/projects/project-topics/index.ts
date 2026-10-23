import { projectsProjectTopicsCreateTopicsMerge } from "./create-topics-merge";
import { projectsProjectTopicsDeleteTopics } from "./delete-topics";
import { projectsProjectTopicsGetTopics } from "./get-topics";
import { projectsProjectTopicsListTopics } from "./list-topics";

export const projectsProjectTopicsTools = [
  projectsProjectTopicsCreateTopicsMerge,
  projectsProjectTopicsDeleteTopics,
  projectsProjectTopicsGetTopics,
  projectsProjectTopicsListTopics,
];
