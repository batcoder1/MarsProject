import { Orientation } from "../../config/constant";
import { Position } from "../helper/position";
import { Grid } from "./grid";
import { createScent, CreateScentParams, Scent } from "./scent";

export class Robot {
  private id: number;
  private grid: Grid;
  private position: Position;
  private orientation: Orientation;
  private isLost: boolean = false;
  private scent: Scent;

  constructor({
    id,
    grid,
    initialLocation,
    initialOrientation,
  }: CreateRobotParams) {
    this.id = id;
    this.setGrid(grid);
    this.setLocation(initialLocation);
    this.setOrientation(initialOrientation);
  }

  public readInstructions(instructions: String) {
    for (let i = 0; i < instructions.length; i++) {
      if (this.isLost) {
        break;
      }
      switch (instructions.charAt(i)) {
        case "R":
          this.turnRight();
          break;
        case "L":
          this.turnLeft();
          break;
        case "F":
          this.moveForward();
          break;
      }
    }
  }

  public moveForward(): void {
    const params: CreateScentParams = {
      point: this.position.getPoint(),
      orientation: this.orientation,
    };
    const _scent: Scent = createScent(params);

    //if it's not in Scent store, move the robot
    if (!this.isScentInStore(_scent)) {
      //move
      switch (this.orientation) {
        case "N":
          this.position.toNorth();
          break;
        case "E":
          this.position.toEast();
          break;
        case "S":
          this.position.toSouth();
          break;
        case "W":
          this.position.toWest();
          break;
      }
      //if robot falls into the abyss, add scent to store
      if (this.isRobotLost() && !this.isScentInStore(_scent)) {
        this.scent = _scent;
        this.grid.addScent(_scent);
      }
    }
  }

  public isScentInStore(scent: Scent) {
    let scentExists = false;
    this.grid.getScents().forEach((scentStore) => {
      if (
        scentStore.getPoint().x == scent.getPoint().x &&
        scentStore.getPoint().y == scent.getPoint().y &&
        scentStore.getOrientation() == scent.getOrientation()
      ) {
        scentExists = true;
      }
    });
    return scentExists;
  }

  public turnRight(): void {
    switch (this.orientation) {
      case "N":
        this.orientation = Orientation.EAST;
        break;
      case "E":
        this.orientation = Orientation.SOUTH;
        break;
      case "S":
        this.orientation = Orientation.WEST;
        break;
      case "W":
        this.orientation = Orientation.NORTH;
        break;
    }
  }

  public turnLeft(): void {
    switch (this.orientation) {
      case "N":
        this.orientation = Orientation.WEST;
        break;
      case "E":
        this.orientation = Orientation.NORTH;
        break;
      case "S":
        this.orientation = Orientation.EAST;
        break;
      case "W":
        this.orientation = Orientation.SOUTH;
        break;
    }
  }

  public isRobotLost() {
    if (
      this.position.getPoint().x > this.grid.getLimits().x ||
      this.position.getPoint().y > this.grid.getLimits().y ||
      this.position.getPoint().x < 0 ||
      this.position.getPoint().y < 0
    ) {
      this.isLost = true;
    }
    return this.isLost;
  }

  public getGrid(): Grid {
    return this.grid;
  }

  public setGrid(grid: Grid) {
    this.grid = grid;
  }

  public getLocation(): Position {
    return this.position;
  }

  public setLocation(position: Position) {
    this.position = position;
  }

  public getOrientation(): Orientation {
    return this.orientation;
  }

  public setOrientation(orientation: Orientation): void {
    this.orientation = orientation;
  }
  public getId() {
    return this.id;
  }
  printLocation(): string {
    if (this.isLost) {
      let point = this.scent.getPoint();
      return `${point.x} ${point.y} ${this.scent.getOrientation()} LOST`;
    } else {
      let point = this.position.getPoint();
      return `${point.x} ${point.y} ${this.orientation}`;
    }
  }
}
export function createRobot(createRobotParams: CreateRobotParams) {
  return new Robot(createRobotParams);
}

export interface CreateRobotParams {
  id: number;
  grid: Grid;
  initialLocation: Position;
  initialOrientation: Orientation;
}
