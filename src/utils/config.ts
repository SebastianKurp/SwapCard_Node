import * as dotenv from "dotenv";

dotenv.config();
let path = `${__dirname}/../../.env`;
dotenv.config({ path: path });

export const MONGODB_URI = process.env.MONGODB_URI;
