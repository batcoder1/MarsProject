import { isValidPayload } from "../index";

import { expect } from "chai";

describe("payload-validators Robot", () => {
  describe("valid", () => {
    it("valid", () => {
      const payload = {
        x: 2,
        y: 2,
        orientation: "N",
      };
      const isValid = isValidPayload(payload, "Robot");
      expect(isValid.result).be.equal(true);
    });

    describe("invalid", () => {
      it("invalid value type", () => {
        const payload = {
          x: "2",
          y: 2,
          orientation: "N",
        };
        const isValid = isValidPayload(payload, "Robot");
        expect(isValid.result).be.equal(false);
      });
      it("invalid value type", () => {
        const payload = {
          x: 2,
          y: 2,
          orientation: "n",
        };
        const isValid = isValidPayload(payload, "Robot");
        expect(isValid.result).be.equal(false);
      });

      it("additional property", () => {
        const payload = {
          x: 2,
          y: 2,
          orientation: "n",
          OtherProperty: "other",
        };
        const isValid = isValidPayload(payload, "Robot");
        expect(isValid.result).be.equal(false);
      });
      it("no info", () => {
        const payload = {};
        const isValid = isValidPayload(payload, "Robot");
        expect(isValid.result).be.equal(false);
      });
    });
  });
});
