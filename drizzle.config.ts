import { type Config } from "drizzle-kit";

import { env } from "@/env";

export default {
  schema: "./src/server/db/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
  out: "./migrations",
  tablesFilter: ["kg_*"],
  schemaFilter: ["public"],
} satisfies Config;
