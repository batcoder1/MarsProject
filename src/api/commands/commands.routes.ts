import * as express from "express";
import CommandsController from "./commands.controller";

export class CommandsRouter {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
  }

  commands() {
    this.router.post("", CommandsController.commands);

    this.router.put("", CommandsController.badRequest);
    this.router.get("", CommandsController.badRequest);
    this.router.delete("", CommandsController.badRequest);
    this.router.options("", CommandsController.badRequest);
    this.router.patch("", CommandsController.badRequest);

    return this.router;
  }
}

export function CreateCommandsRouter(): CommandsRouter {
  return new CommandsRouter();
}
