import * as express from "express";
import {
  default as GridController,
  default as RobotController,
} from "./grid.controller";

export class GridRouter {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
  }

  grid() {
    this.router.put("", GridController.createGrid);

    this.router.get("", GridController.badRequest);
    this.router.post("", GridController.badRequest);
    this.router.delete("", GridController.badRequest);
    this.router.options("", RobotController.badRequest);
    this.router.patch("", RobotController.badRequest);

    return this.router;
  }
}

export function CreateGridRouter(): GridRouter {
  return new GridRouter();
}
