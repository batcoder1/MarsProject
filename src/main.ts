import { logger } from "./share/util/logger";
import * as server from "./server";

(async () => {
  try {
    await server.start();
    logger.info("Mars mission started...");
  } catch (error) {
    logger.debug("Mars starting error:", error);
  }
})();
