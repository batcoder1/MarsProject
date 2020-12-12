import { Orientation } from "../../config/constant";
import { Point } from "../types/point";

export class Scent {
  private point: Point;
  private orientation: Orientation;

  constructor({ point, orientation }: CreateScentParams) {
    this.point = point;
    this.setOrientation(orientation);
  }

  getPoint(): Point {
    return this.point;
  }

  getOrientation(): Orientation {
    return this.orientation;
  }

  setOrientation(orientation: Orientation): void {
    this.orientation = orientation;
  }

  equalsPositionAndOrientation(scent: Scent): boolean {
    return (
      this.point == scent.getPoint() &&
      this.orientation == scent.getOrientation()
    );
  }
}

export function createScent(params: CreateScentParams) {
  return new Scent(params);
}

export interface CreateScentParams {
  // TODO change to Position type
  point: Point;
  orientation: Orientation;
}
