import { expect } from "chai";
import { BASE_URL, Orientation } from "../../config/constant";
import { createPosition } from "../helper/position";
import * as server from "../server";
import { Grid } from "./grid";
import { createRobot, CreateRobotParams, Robot } from "./robot";

const baseUrl = BASE_URL;
let grid: Grid;
describe("Test robot ", () => {
  before(async () => {
    await server.start();
    const position = createPosition(5, 4);
    grid = Grid.getInstance(position);
    grid.setLimits(5, 4);
    grid.reseteMemory();
  });
  after(async () => {
    server.stopServer();
  });

  it("function createRobot should create robot with same params", async () => {
    const NumRobotsExpect = 1;
    const paramRobot: CreateRobotParams = {
      id: 0,
      grid,
      initialLocation: createPosition(1, 1),
      initialOrientation: Orientation.EAST,
    };
    const robot: Robot = createRobot(paramRobot);

    expect(robot.getId()).equals(paramRobot.id);
    expect(robot.getLocation()).equals(paramRobot.initialLocation);
    expect(robot.getOrientation()).equals(paramRobot.initialOrientation);
  });

  it("method readInstructions should read L instruction and turn left the robot", async () => {
    const NumRobotsExpect = 1;
    const paramRobot: CreateRobotParams = {
      id: 1,
      grid,
      initialLocation: createPosition(4, 3),
      initialOrientation: Orientation.EAST,
    };
    const robot: Robot = createRobot(paramRobot);

    const instructions = "L";
    robot.readInstructions(instructions);

    expect(robot.getId()).equals(paramRobot.id);
    expect(robot.getLocation()).equals(paramRobot.initialLocation);
    expect(robot.getOrientation()).equals(Orientation.NORTH);
  });
  it("method readInstructions should read LLLL and robot should stand in same orientation", async () => {
    const NumRobotsExpect = 1;
    const paramRobot: CreateRobotParams = {
      id: 1,
      grid,
      initialLocation: createPosition(4, 3),
      initialOrientation: Orientation.EAST,
    };
    const robot: Robot = createRobot(paramRobot);

    const instructions = "LLLL";
    robot.readInstructions(instructions);

    expect(robot.getId()).equals(paramRobot.id);
    expect(robot.getLocation()).equals(paramRobot.initialLocation);
    expect(robot.getOrientation()).equals(Orientation.EAST);
  });
  it("method readInstructions should read R instruction and turn right the robot", async () => {
    const NumRobotsExpect = 1;
    const paramRobot: CreateRobotParams = {
      id: 2,
      grid,
      initialLocation: createPosition(4, 3),
      initialOrientation: Orientation.EAST,
    };
    const robot: Robot = createRobot(paramRobot);

    const instructions = "R";
    robot.readInstructions(instructions);

    expect(robot.getId()).equals(paramRobot.id);
    expect(robot.getLocation()).equals(paramRobot.initialLocation);
    expect(robot.getOrientation()).equals(Orientation.SOUTH);
  });
  it("method readInstructions should read R instruction and turn right the robot", async () => {
    const NumRobotsExpect = 1;
    const paramRobot: CreateRobotParams = {
      id: 2,
      grid,
      initialLocation: createPosition(4, 3),
      initialOrientation: Orientation.EAST,
    };
    const robot: Robot = createRobot(paramRobot);

    const instructions = "RRRR";
    robot.readInstructions(instructions);

    expect(robot.getId()).equals(paramRobot.id);
    expect(robot.getLocation()).equals(paramRobot.initialLocation);
    expect(robot.getOrientation()).equals(Orientation.EAST);
  });
  it("method readInstructions should read F instruction and turn right the robot", async () => {
    const positionExpected = createPosition(5, 3);
    const paramRobot: CreateRobotParams = {
      id: 3,
      grid,
      initialLocation: createPosition(4, 3),
      initialOrientation: Orientation.EAST,
    };
    const robot: Robot = createRobot(paramRobot);

    const instructions = "F";
    robot.readInstructions(instructions);

    expect(robot.getId()).equals(paramRobot.id);
    expect(robot.getLocation()).deep.equals(positionExpected);
    expect(robot.getOrientation()).equals(Orientation.EAST);
  });
  it("method isRobotLost should return true if a robot fall for edge", async () => {
    const valueExpected = true;
    const paramRobot: CreateRobotParams = {
      id: 4,
      grid,
      initialLocation: createPosition(5, 4),
      initialOrientation: Orientation.EAST,
    };
    const robot: Robot = createRobot(paramRobot);

    const instructions = "F";
    robot.readInstructions(instructions);

    const isLost = robot.isRobotLost();
    expect(isLost).equals(valueExpected);
  });
  it("method isRobotLost should return false because scent already exists", async () => {
    console.log("method isRobotLost***");

    const valueExpected = false;
    const paramRobot: CreateRobotParams = {
      id: 5,
      grid,
      initialLocation: createPosition(5, 4),
      initialOrientation: Orientation.EAST,
    };
    const robot: Robot = createRobot(paramRobot);

    const instructions = "F";
    robot.readInstructions(instructions);

    const isLost = robot.isRobotLost();
    expect(isLost).equals(valueExpected);
  });
});
