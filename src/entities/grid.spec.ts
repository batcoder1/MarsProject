import { expect } from "chai";
import { BASE_URL, Orientation } from "../../config/constant";
import { Grid } from "./grid";
import { createPosition, Position } from "../helper/position";
import * as server from "../server";
import { createRobot, CreateRobotParams, Robot } from "./robot";
import { createScent, CreateScentParams, Scent } from "./scent";

const baseUrl = BASE_URL;
let grid: Grid;
describe("Test grid ", () => {
  before(async () => {
    const position = createPosition(5, 4);
    grid = Grid.getInstance(position);
    grid.setLimits(5, 4);
    grid.reseteMemory();
  });

  it("method addRobot should add robot to array of robots ", async () => {
    const NumRobotsExpect = 1;
    const paramRobot: CreateRobotParams = {
      id: 0,
      grid,
      initialLocation: createPosition(1, 1),
      initialOrientation: Orientation.EAST,
    };
    const robot: Robot = createRobot(paramRobot);
    grid.addRobot(robot);

    expect(grid.getRobots().length).equals(NumRobotsExpect);
    expect(grid.getRobots()[0].getId()).equals(paramRobot.id);
    expect(grid.getRobots()[0].getOrientation()).equals(
      paramRobot.initialOrientation
    );
  });
  it("method getNewRobotId should get a new robotId", async () => {
    const NumRobotIdExpect = 1;

    const robotId = grid.getNewRobotId();

    expect(robotId).equals(NumRobotIdExpect);
  });
  it("method getRobotById should return a robot", async () => {
    const NumRobotIdExpect = 0;

    const robot = grid.getRobotById(0);

    expect(robot.getId()).equals(NumRobotIdExpect);
  });
  it("method getRobotById that not exists should return  undefined", async () => {
    const NumRobotIdExpect = undefined;

    const robot = grid.getRobotById(50);

    expect(robot).equals(NumRobotIdExpect);
  });
  it("method addScent should add robot to array of scents ", async () => {
    const NumScentExpect = 1;
    const position = new Position(3, 3);
    const params: CreateScentParams = {
      point: position.getPoint(),
      orientation: Orientation.NORTH,
    };

    const scent: Scent = createScent(params);
    grid.addScent(scent);

    expect(grid.getScents().length).equals(NumScentExpect);
    expect(grid.getScents()[0].getPoint()).deep.equals(params.point);
  });

  it("method getNewRobotId should get a new robotId", async () => {
    const NumRobotIdExpect = 1;

    const robotId = grid.getNewRobotId();

    expect(robotId).equals(NumRobotIdExpect);
  });
  it("method getRobotById should return a robot", async () => {
    const NumRobotIdExpect = 0;

    const robot = grid.getRobotById(0);

    expect(robot.getId()).equals(NumRobotIdExpect);
  });
  it("method getRobotById that not exists should return  undefined", async () => {
    const NumRobotIdExpect = undefined;

    const robot = grid.getRobotById(50);

    expect(robot).equals(NumRobotIdExpect);
  });
});
