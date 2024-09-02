import * as path from "node:path";
import { env } from "node:process";
import { fileURLToPath } from "node:url";

console.log(process.env);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BUILD_DIR_PATH = path.join(__dirname, "../../dist");
const SRC_DIR_PATH = path.join(__dirname, "../../assets");

export { BUILD_DIR_PATH, SRC_DIR_PATH, __dirname };
