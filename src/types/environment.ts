interface Env {
  NODE_ENV: string | undefined;
  PORT: number | undefined;
  // MONGO_URI: string | undefined;
}

interface EnvStrict {
  NODE_ENV: "development" | "production";
  PORT: number;
  // MONGO_URI: string;
}

export type { Env, EnvStrict };
