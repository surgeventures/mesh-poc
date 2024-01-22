import { YamlConfig } from "@graphql-mesh/types";
import { init } from "./enmesh";

import { service as appointments } from "./services/appointments/describe";
import { connections as appointmentConnections } from "./services/appointments/connect";
import { service as customers } from "./services/customers/describe";
import { service as sales } from "./services/sales/describe";

const enmesh = init(
  [appointments, customers, sales],
  [...appointmentConnections],
);

const config: YamlConfig.Config = {
  serve: {
    port: 3000,
  },
  documents: ["../fresha/app/**/*.tsx"],
  ...enmesh,
  additionalEnvelopPlugins: "./envelopPlugins.ts",
  codegen: {
    useIndexSignature: false,
  },
};

export default config;
