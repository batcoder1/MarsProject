import { logger } from "../share/util/logger";
import { Point } from "../types/point";

export class Position {
  private x: number;
  private y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  getX() {
    return this.x;
  }
  getY() {
    return this.y;
  }
  setPosition(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }
  getPoint(): Point {
    let x = this.x;
    let y = this.y;

    return { x, y };
  }

  toNorth() {
    this.y++;
  }

  toEast() {
    this.x++;
  }

  toSouth() {
    this.y--;
  }
  toWest() {
    this.x--;
  }

  printPosition() {
    logger.info(`(${this.x} , ${this.y})`);
  }
}
/**
 * createPosition
 */

export function createPosition(x: number, y: number) {
  return new Position(x, y);
}
