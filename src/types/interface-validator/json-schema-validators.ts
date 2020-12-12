import * as Ajv from "ajv";
import { join } from "path";
import { interfaceTypes } from "../../../config/constant";

const ajv = initAjvWithDraft04Support();
const jsonSchemasDirectory = join(__dirname, "./json-schemas");
type ValidatorsMap = Map<string, Ajv.ValidateFunction>;

export { ValidateFunction as Validator } from "ajv";

export class Validators {
  constructor(private readonly _validators: ValidatorsMap) {}

  get(type: string): Ajv.ValidateFunction {
    return this._validators.get(type);
  }
}

export function createJsonSchemaValidators(): Validators {
  const validators: ValidatorsMap = new Map();

  Array.from(interfaceTypes).forEach((type: string) => {
    addValidator(validators, type);
  });

  return new Validators(validators);
}

// init JSON Schema validator library with draft-04 support
function initAjvWithDraft04Support() {
  // OCPP-J 1.6 JSON schemas don't conform 100% to the  Draft04 standard. They use the
  // keyword 'id' inside the properties (eg. ClearChargingProfile.json) and it should
  // be reserved for the schema URI (which is not used).
  const ajvClient = new Ajv({
    schemaId: "auto",
    multipleOfPrecision: 1,
  });
  ajvClient.addMetaSchema(require("ajv/lib/refs/json-schema-draft-04.json"));
  return ajvClient;
}

function addValidator(validators: ValidatorsMap, type: string): void {
  const validatorSchemaPath = getValidatorSchemaPath(type);
  const validator = ajv.compile(require(validatorSchemaPath));

  validators.set(type, validator);
}

// Returns 'typeName.json'
function getValidatorSchemaFilename(type: string): string {
  return `${type}.json`;
}
function getValidatorSchemaPath(action: string): string {
  return join(jsonSchemasDirectory, getValidatorSchemaFilename(action));
}
