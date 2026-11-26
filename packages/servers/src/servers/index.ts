import { postman } from "./api";
import { n8n } from "./automation";
import { cloudflare, ngrok } from "./cloud";
import { discord, medium, reddit, teams } from "./communication";
import { figma } from "./design";
import { github, gitlab } from "./git";
import {
  clion,
  confluence,
  datagrip,
  dataspell,
  goland,
  intellij,
  jira,
  phpstorm,
  pycharm,
  rider,
  rubymine,
  rustrover,
  trello,
  webstorm,
} from "./orgs";
import { clickup } from "./productivity";
import { bitwarden } from "./security";

export const servers = [
  bitwarden,
  clickup,
  clion,
  cloudflare,
  confluence,
  datagrip,
  dataspell,
  discord,
  figma,
  github,
  gitlab,
  goland,
  intellij,
  jira,
  medium,
  n8n,
  ngrok,
  phpstorm,
  postman,
  pycharm,
  reddit,
  rider,
  rubymine,
  rustrover,
  teams,
  trello,
  webstorm,
];
