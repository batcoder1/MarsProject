import { Request, Response } from "express";
import { GRID } from "../../../config/constant";
import { Grid } from "../../handlers/grid";
import { createPosition, Position } from "../../helper/position";
import { createErrorHandler } from "../../share/error-handler/error.handler";
import { logger } from "../../share/util/logger";
import {
  getValidationErrors,
  isValidParams,
} from "../../types/interface-validator";
export default class GridController {
  /**
   * createGrid
   * @param {*} req
   * @param {*} res
   *
   */
  public static createGrid(req: Request, res: Response) {
    try {
      logger.info("createGrid...:");
      logger.info(JSON.stringify(req.body));

      if (!isValidParams(req.body, GRID)) {
        const error = getValidationErrors(req.body, GRID);
        createErrorHandler(400, error).throwIt();
      }

      const { x, y } = req.body;
      const position: Position = createPosition(x, y);
      Grid.getInstance(position);

      res.send();
    } catch (error) {
      res.status(error.code).send({ error });
    }
  }

  public static badRequest(req: Request, res: Response) {
    logger.debug("badRequest...:");
    res.status(400).send();
  }
}
