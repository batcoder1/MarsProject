import * as express from "express";
import { logger } from "../../share/util/logger";
import RobotController from "./robot.controller";

export class RobotRouter {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
  }

  robots() {
    this.router.get("", RobotController.getRobots);
    this.router.put("", RobotController.createRobot);

    this.router.post("", RobotController.badRequest);
    this.router.delete("", RobotController.badRequest);
    this.router.options("", RobotController.badRequest);
    this.router.patch("", RobotController.badRequest);

    return this.router;
  }
}

export function CreateRobotRouter(): RobotRouter {
  return new RobotRouter();
}
