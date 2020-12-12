import {
  createJsonSchemaValidators,
  Validators,
  Validator,
} from "./json-schema-validators";
import { isNil } from "lodash";
import { logger } from "../../share/util/logger";

const validators: Validators = createJsonSchemaValidators();

export function isValidPayload(payload: object, type: string): any {
  const validate: Validator = validators.get(type);
  if (!validate) {
    return {
      result: false,
      errors: [{ message: "Schema not found" }],
    };
  }

  let payloadToValidate = payload;

  if (isNil(payloadToValidate)) {
    payloadToValidate = {};
  }

  const result = validate(payloadToValidate);
  return {
    result,
    errors: validate.errors,
  };
}

export function getValidationErrors(payload, type): any[] {
  logger.debug("getValidationErrors...");
  const isValid = isValidPayload(payload, type);
  return isValid.errors;
}

export function isValidParams(arg: any, type): boolean {
  logger.info("isValidParams....");
  const isValid = isValidPayload(arg, type);
  if (isValid.errors) {
    logger.info(isValid.errors[0].params);
  }
  return isValid.result;
}
