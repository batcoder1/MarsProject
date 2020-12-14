import { Request, Response } from "express";
import { COMMANDS } from "../../../config/constant";
import { Grid } from "../../entities/grid";
import { createErrorHandler } from "../../share/error-handler/error.handler";
import { logger } from "../../share/util/logger";
import {
  getValidationErrors,
  isValidParams,
} from "../../types/interface-validator";
export default class CommandsController {
  /**
   * commands
   * @param {*} req
   * @param {*} res
   *
   */
  public static commands(req: Request, res: Response) {
    try {
      logger.info("commands...:");
      logger.info(JSON.stringify(req.body));

      if (!isValidParams(req.body, COMMANDS)) {
        const error = getValidationErrors(req.body, COMMANDS);
        createErrorHandler(400, error).throwIt();
      }

      const { robotId, commands } = req.body;
      const grid = Grid.getInstance();
      const robot = grid.getRobotById(robotId);
      robot.readInstructions(commands);
      const location = robot.printLocation();

      res.send(location);
    } catch (error) {
      res.status(error.code).send({ error });
    }
    console;
  }

  public static badRequest(req: Request, res: Response) {
    logger.debug("badRequest...:");
    res.status(400).send();
  }
}
