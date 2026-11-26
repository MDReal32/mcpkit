import { postman } from "./api/postman";
import { n8n } from "./automation/n8n";
import { cloudflare } from "./cloud/cloudflare";
import { ngrok } from "./cloud/ngrok";
import { discord } from "./communication/discord";
import { medium } from "./communication/medium";
import { reddit } from "./communication/reddit";
import { teams } from "./communication/teams";
import { figma } from "./design/figma";
import { github } from "./git/github";
import { gitlab } from "./git/gitlab";
import { confluence } from "./orgs/atlassian/confluence";
import { jira } from "./orgs/atlassian/jira";
import { trello } from "./orgs/atlassian/trello";
import { clion } from "./orgs/jetbrains/clion";
import { datagrip } from "./orgs/jetbrains/datagrip";
import { dataspell } from "./orgs/jetbrains/dataspell";
import { goland } from "./orgs/jetbrains/goland";
import { intellij } from "./orgs/jetbrains/intellij";
import { phpstorm } from "./orgs/jetbrains/phpstorm";
import { pycharm } from "./orgs/jetbrains/pycharm";
import { rider } from "./orgs/jetbrains/rider";
import { rubymine } from "./orgs/jetbrains/rubymine";
import { rustrover } from "./orgs/jetbrains/rustrover";
import { webstorm } from "./orgs/jetbrains/webstorm";
import { clickup } from "./productivity/clickup";
import { bitwarden } from "./security/bitwarden";

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
