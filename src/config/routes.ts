import * as express from "express";
import { Path } from "../../config/constant";
import { CreateRobotRouter } from "../api/robot/robot.routes";
import { CreateGridRouter } from "../api/grid/grid.routes";
import { CreateCommandsRouter } from "../api/commands/commands.routes";

export class Routes {
  public router: express.Router;
  private app: express.Express;

  constructor(app: express.Express) {
    // Set router
    this.router = express.Router();

    // Set app
    this.app = app;

    // Set all routes
    this.setAllRoutes();
  }

  /**locate
   * Set all app routes
   */
  private setAllRoutes() {
    this.app.use(Path.robot, CreateRobotRouter().robots());
    this.app.use(Path.grid, CreateGridRouter().grid());
    this.app.use(Path.commands, CreateCommandsRouter().commands());
    this.app.route("/*").get(this.index);
  }

  /**
   * Main route
   */
  private index(req: express.Request, res: express.Response) {
    res.json({
      message: "Welcome Mars Proyect API",
    });
  }
}

export function createRoutes(app: express.Express) {
  return new Routes(app);
}
