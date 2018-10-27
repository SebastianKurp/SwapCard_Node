declare function require(moduleName: string): any;

if (process.env.NODE_ENV !== "production") {
  // Used only in development to load environment variables from local file.
  const dotenv: any = require("dotenv");

  dotenv.config();
}

export const MONGODB_URI = process.env.MONGODB_URI || "FallBack";