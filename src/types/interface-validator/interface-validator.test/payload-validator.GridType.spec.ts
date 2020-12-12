import { isValidPayload } from "../index";

import { expect } from "chai";

describe("payload-validators grid", () => {
  describe("valid", () => {
    it("valid", () => {
      const payload = {
        x: 2,
        y: 2,
      };
      const isValid = isValidPayload(payload, "Grid");
      expect(isValid.result).be.equal(true);
    });

    describe("invalid", () => {
      it("invalid value type", () => {
        const payload = {
          x: 1,
        };
        const isValid = isValidPayload(payload, "Grid");
        expect(isValid.result).be.equal(false);
      });

      it("additional property", () => {
        const payload = {
          x: 1,
          OtherProperty: "other",
        };
        const isValid = isValidPayload(payload, "Grid");
        expect(isValid.result).be.equal(false);
      });
    });
  });
});
