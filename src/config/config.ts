import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { Env, EnvStrict } from "../types";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

// Parsing the env file.
dotenv.config({ path: path.resolve(__dirname, "../../.env.local") });

// Interface to load env variables is defined in ../types
// Note these variables can possibly be undefined
// as someone could skip these varibales or not setup a .env file at all

const getConfig = (): Env => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT ? Number(process.env.PORT) : undefined
    // MONGO_URI: process.env.MONGO_URI
  };
};

// Throwing an Error if any field was undefined we don't
// want our app to run if it can't connect to DB and ensure
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type
// definition.

const getSanitizedConfig = (config: Env): EnvStrict => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as EnvStrict;
};

const config = getConfig();

const sanitizedConfig = getSanitizedConfig(config);

export default sanitizedConfig;
