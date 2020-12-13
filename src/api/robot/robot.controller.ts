import { Request, Response } from "express";
import { ROBOT } from "../../../config/constant";
import { Grid } from "../../handlers/grid";
import { createRobot, CreateRobotParams, Robot } from "../../handlers/robot";
import { createPosition } from "../../helper/position";
import { createErrorHandler } from "../../share/error-handler/error.handler";
import { logger } from "../../share/util/logger";
import {
  getValidationErrors,
  isValidParams,
} from "../../types/interface-validator";
export default class RobotController {
  /**
   * LoadRobot
   * @param {*} req
   * @param {*} res
   *
   */
  public static createRobot(req: Request, res: Response) {
    try {
      logger.info("createRobot...:");

      if (!isValidParams(req.body, ROBOT)) {
        const error = getValidationErrors(req.body, ROBOT);
        createErrorHandler(400, error).throwIt();
      }

      const { x, y, orientation } = req.body;

      const grid = Grid.getInstance();
      if (!grid) {
        createErrorHandler(400, "Grid not exists, please create one").throwIt();
      }
      let id = grid.getNewRobotId();
      const paramRobot: CreateRobotParams = {
        id,
        grid,
        initialLocation: createPosition(x, y),
        initialOrientation: orientation,
      };

      const robot: Robot = createRobot(paramRobot);
      grid.addRobot(robot);

      res.send({ robotId: id });
    } catch (error) {
      logger.error(error);
      res.status(error.code).send({ error });
    }
  }
  /**
   * GetRobots
   * @param {*} req
   * @param {*} res
   *
   */
  public static getRobots(req: Request, res: Response) {
    try {
      logger.info("getRobots...:");

      const grid = Grid.getInstance();
      if (!grid) {
        createErrorHandler(400, "Grid not exists, please create one").throwIt();
      }
      const robots = grid.getRobots().map((robot) => {
        return {
          id: robot.getId(),
          position: robot.getLocation(),
          orientation: robot.getOrientation(),
        };
      });
      res.send(robots);
    } catch (error) {
      logger.error(error.message);

      res.status(error.code).send({ error });
    }
  }
  public static badRequest(req: Request, res: Response) {
    logger.debug("badRequest...:");
    res.status(400).send();
  }
}
