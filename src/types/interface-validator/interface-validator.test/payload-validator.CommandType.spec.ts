import { isValidPayload } from "../index";

import { expect } from "chai";

describe("payload-validators Commands", () => {
  describe("valid", () => {
    it("valid", () => {
      const payload = {
        robotId: 1,
        commands: "LRFR",
      };
      const isValid = isValidPayload(payload, "Commands");
      expect(isValid.result).be.equal(true);
    });

    describe("invalid", () => {
      it("invalid value type", () => {
        const payload = {
          robotId: 1,
          commands: 1,
        };
        const isValid = isValidPayload(payload, "Commands");
        expect(isValid.result).be.equal(false);
      });

      it("additional property", () => {
        const payload = {
          robotId: 1,
          commands: "FRFR",
          OtherProperty: "other",
        };
        const isValid = isValidPayload(payload, "Commands");
        expect(isValid.result).be.equal(false);
      });
      it("no info", () => {
        const payload = {};
        const isValid = isValidPayload(payload, "Commands");
        expect(isValid.result).be.equal(false);
      });
    });
  });
});
