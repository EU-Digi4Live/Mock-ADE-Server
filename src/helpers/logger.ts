import logger from "loglevel";
import dotenv from "dotenv";

dotenv.config();
const { LOG_LEVEL } = process.env;
logger.setLevel(LOG_LEVEL as logger.LogLevelDesc);

export const Logger = logger;
