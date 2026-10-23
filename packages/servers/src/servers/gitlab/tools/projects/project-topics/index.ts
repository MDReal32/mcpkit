import { projectsProjectTopicsCreateTopics } from "./create-topics";
import { projectsProjectTopicsCreateTopicsMerge } from "./create-topics-merge";
import { projectsProjectTopicsDeleteTopics } from "./delete-topics";
import { projectsProjectTopicsGetTopics } from "./get-topics";
import { projectsProjectTopicsListTopics } from "./list-topics";
import { projectsProjectTopicsUpdateTopics } from "./update-topics";

export const projectsProjectTopicsTools = [
  projectsProjectTopicsCreateTopics,
  projectsProjectTopicsCreateTopicsMerge,
  projectsProjectTopicsDeleteTopics,
  projectsProjectTopicsGetTopics,
  projectsProjectTopicsListTopics,
  projectsProjectTopicsUpdateTopics,
];
