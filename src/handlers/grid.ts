import { Position } from "../helper/position";
import { Point } from "../types/point";
import { Robot } from "./robot";
import { Scent } from "./scent";

export class Grid {
  private limits: Point;
  private scents: Scent[] = [];
  private robots: Robot[] = [];

  constructor(position: Position) {
    this.limits = position.getPoint();
  }
  private static instance: Grid;

  public static getInstance(position?: Position): Grid {
    if (!Grid.instance && position) {
      Grid.instance = new Grid(position);
    }
    return Grid.instance;
  }

  public addRobot(robot: Robot): void {
    this.robots.push(robot);
  }
  public getNewRobotId(): number {
    let id = 0;
    if (this.robots?.length > 0) {
      // get the id of the last robot and add 1
      id = this.robots.slice(-1)[0].getId() + 1;
    }
    return id;
  }
  public getRobotById(id: number): Robot {
    return this.robots.find((robot) => robot.getId() == id);
  }

  public addScent(scent: Scent): void {
    console.log("addScent", scent);
    this.scents.push(scent);
  }

  public getRobots(): Robot[] {
    return this.robots;
  }

  public setRobots(robots: Robot[]): void {
    this.robots = robots;
  }

  public getScents(): Scent[] {
    return this.scents;
  }

  public setScents(scents: Scent[]) {
    this.scents = scents;
  }

  public getLimits() {
    return this.limits;
  }
  public setLimits(x: number, y: number) {
    this.limits.x = x;
    this.limits.y = y;
  }
  public reseteMemory() {
    this.scents = [];
    this.robots = [];
  }
}
