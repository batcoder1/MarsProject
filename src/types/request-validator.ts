import { Request } from "express";
import { logger } from "../share/util/logger";
import { BAD_REQUEST, CONTENT_TYPE_VALID } from "../../config/constant";
import { createErrorHandler } from "../share/error-handler/error.handler";
import { getValidationErrors, isValidParams } from "./interface-validator";

export function requestValidator(req: Request, type: string) {
  const contentTypeValid = CONTENT_TYPE_VALID.find(
    (ele) => ele == req.headers["content-type"]
  );
  if (!contentTypeValid) {
    logger.debug("content type error");
    createErrorHandler(400, BAD_REQUEST).throwIt();
  }
  if (!isValidParams(req.body, type)) {
    const error = getValidationErrors(req.body, type);
    logger.debug(JSON.stringify(error));

    createErrorHandler(400, error).throwIt();
  }
  const ID: number = req.body.ID;

  return ID;
}
