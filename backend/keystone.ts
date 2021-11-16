import "dotenv/config";
import { config } from "@keystone-next/keystone";

import { lists } from "./schema";

import { withAuth, session } from "./auth";
import { KeystoneContext } from "@keystone-next/keystone/types";
import { extendGraphqlSchema } from "./mutations";
import { statelessSessions } from "@keystone-next/keystone/session";

export default withAuth(
  config({
    server: {
      cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true,
      },
    },
    db: {
      provider: "sqlite",
      url: process.env.DATABASE_URL || "file:./keystone.db",
      async onConnect(keystone: KeystoneContext): Promise<void> {
        console.log("==============================");
        console.log("Connected to data base");
        console.log("==============================");
        if (process.argv.includes("--seed-data")) {
          console.log("++++++++++++++++++++++++++++++");
          console.log("putting data inside database/ injecting data");
          console.log("++++++++++++++++++++++++++++++");
        }
      },
    },
    ui: {
      isAccessAllowed: (context) => !!context.session?.data,
    },
    lists,
    extendGraphqlSchema,
    session,
  })
);
