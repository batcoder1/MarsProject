import {
  createJsonSchemaValidators,
  Validators,
} from "./json-schema-validators";
import { expect } from "chai";

describe("validators-json-schema", () => {
  let validators: Validators;

  before(() => {
    validators = createJsonSchemaValidators();
  });
  it("gets Robot validator", () => {
    expect(validators.get("Robot")).not.be.equal(null);
  });
  it("gets Grid validator", () => {
    expect(validators.get("Grid")).not.be.equal(null);
  });
});
