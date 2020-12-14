import { expect } from "chai";
import { Point } from "types/point";
import { BASE_URL, Orientation } from "../../config/constant";
import * as server from "../server";
import { createScent, CreateScentParams, Scent } from "./scent";

const baseUrl = BASE_URL;
let scent: Scent;
describe("Test scent ", () => {
  before(async () => {
    const point: Point = { x: 3, y: 5 };
    const params: CreateScentParams = {
      point,
      orientation: Orientation.NORTH,
    };
    scent = createScent(params);
  });

  it("method equalsPositionAndOrientation should return true ", async () => {
    const responseExpected = true;

    const isEqueal = scent.equalsPositionAndOrientation(scent);

    expect(isEqueal).equals(responseExpected);
  });
  it("method equalsPositionAndOrientation should return false ", async () => {
    const responseExpected = false;
    const point: Point = { x: 1, y: 3 };
    const params: CreateScentParams = {
      point,
      orientation: Orientation.NORTH,
    };
    const scentNew = createScent(params);

    const isEqueal = scent.equalsPositionAndOrientation(scentNew);

    expect(isEqueal).equals(responseExpected);
  });
});
