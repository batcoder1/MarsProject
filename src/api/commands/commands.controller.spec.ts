import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";
import { expect } from "chai";
import {
  BASE_URL,
  HTTP_CODE_BAD_REQUEST,
  HTTP_CODE_OK,
  Orientation,
  Path,
} from "../../../config/constant";
import { Grid } from "../../handlers/grid";
import { createRobot, CreateRobotParams, Robot } from "../../handlers/robot";
import { createPosition } from "../../helper/position";
import * as server from "../../server";

/*
Sample input
5 3

1 1 E
RFRFRFRF

3 2 N
FRRFLLFFRRFLL

0 3 W
LLFFFLFLFL

Sample output
1 1 E
3 3 N LOST
2 3 S

*/
const baseUrl = BASE_URL;
describe("Test command controller", () => {
  before(async () => {
    await server.start();
    // create grid
    const position = createPosition(5, 3);
    const grid = Grid.getInstance(position);
    grid.reseteMemory();
    // create a robot to send commands
    const paramRobot: CreateRobotParams = {
      id: 0,
      grid,
      initialLocation: createPosition(1, 1),
      initialOrientation: Orientation.EAST,
    };
    const robot: Robot = createRobot(paramRobot);
    grid.addRobot(robot);

    // create a robot to send commands
    const paramRobot1: CreateRobotParams = {
      id: 1,
      grid,
      initialLocation: createPosition(3, 2),
      initialOrientation: Orientation.NORTH,
    };
    const robot1: Robot = createRobot(paramRobot1);
    grid.addRobot(robot1);

    // create a robot to send commands
    const paramRobot2: CreateRobotParams = {
      id: 2,
      grid,
      initialLocation: createPosition(0, 3),
      initialOrientation: Orientation.WEST,
    };
    const robot2: Robot = createRobot(paramRobot2);
    grid.addRobot(robot2);
  });
  after(async () => {
    server.stopServer();
  });

  it("commands should respod 200, and 1 1 E ", async () => {
    const postDataApi = {
      robotId: 0,
      commands: "RFRFRFRF",
    };
    const responseExpect = "1 1 E";
    const endpoint = Path.commands;
    const method: Method = "post";
    const resp = await apiCall(postDataApi, endpoint, method);
    expect(resp.status).equals(HTTP_CODE_OK);
    expect(resp.data).equals(responseExpect);
  });

  it("commands should respod 200 and 3 3 N LOST", async () => {
    const postDataApi = {
      robotId: 1,
      commands: "FRRFLLFFRRFLL",
    };
    const responseExpect = "3 3 N LOST";
    const endpoint = Path.commands;
    const method: Method = "post";
    const resp = await apiCall(postDataApi, endpoint, method);
    expect(resp.status).equals(HTTP_CODE_OK);
    expect(resp.data).equals(responseExpect);
  });

  it("commands should respod 200 and 2 3 S", async () => {
    const postDataApi = {
      robotId: 2,
      commands: "LLFFFLFLFL",
    };
    const responseExpect = "2 3 S";
    const endpoint = Path.commands;
    const method: Method = "post";
    const resp = await apiCall(postDataApi, endpoint, method);
    expect(resp.status).equals(HTTP_CODE_OK);
    expect(resp.data).equals(responseExpect);
  });

  it("delete method in commands should respod 400 ", async () => {
    const postDataApi = {};

    const endpoint = Path.commands;
    const method: Method = "delete";
    const resp = await apiCall(postDataApi, endpoint, method);
    expect(HTTP_CODE_BAD_REQUEST).equals(resp.status);
  });
  it("options method in commands should respod 400 ", async () => {
    const postDataApi = {};

    const endpoint = Path.commands;
    const method: Method = "options";
    const resp = await apiCall(postDataApi, endpoint, method);
    expect(HTTP_CODE_BAD_REQUEST).equals(resp.status);
  });
  it("post method in commands should respod 400 ", async () => {
    const postDataApi = {};

    const endpoint = Path.commands;
    const method: Method = "post";
    const resp = await apiCall(postDataApi, endpoint, method);
    expect(HTTP_CODE_BAD_REQUEST).equals(resp.status);
  });
  it("patch method in commands should respod 400 ", async () => {
    const postDataApi = {};

    const endpoint = Path.commands;
    const method: Method = "patch";
    const resp = await apiCall(postDataApi, endpoint, method);
    expect(HTTP_CODE_BAD_REQUEST).equals(resp.status);
  });
  it("get method in commands should respod 400 ", async () => {
    const postDataApi = {};
    const endpoint = Path.commands;
    const method: Method = "get";
    const resp = await apiCall(postDataApi, endpoint, method);
    expect(HTTP_CODE_BAD_REQUEST).equals(resp.status);
  });
});

async function apiCall(
  dataRequest: any,
  endpoint: string,
  method: Method
): Promise<AxiosResponse> {
  try {
    const config: AxiosRequestConfig = {
      url: endpoint,
      method,
      baseURL: baseUrl,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      data: dataRequest,
    };
    const response = await axios(config);

    return response;
  } catch (error) {
    return error.response;
  }
}
