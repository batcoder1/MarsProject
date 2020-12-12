import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";
import { expect } from "chai";
import {
  BASE_URL,
  HTTP_CODE_BAD_REQUEST,
  HTTP_CODE_OK,
  Path,
} from "../../../config/constant";
import { Grid } from "../../handlers/grid";
import { createPosition } from "../../helper/position";
import * as server from "../../server";

const baseUrl = BASE_URL;
describe("Test grid controller", () => {
  before(async () => {
    await server.start();
    const position = createPosition(5, 4);
    const grid = Grid.getInstance(position);
    grid.reseteMemory();
  });
  after(async () => {
    server.stopServer();
  });

  it("robots should respod 200 ", async () => {
    const postDataApi = {
      x: 2,
      y: 2,
    };

    const endpoint = Path.grid;
    const method: Method = "put";
    const resp = await apiCall(postDataApi, endpoint, method);
    expect(HTTP_CODE_OK).equals(resp.status);
  });

  it("delete method in grid should respod 400 ", async () => {
    const postDataApi = {
      x: 2,
      y: 2,
      orientation: "N",
    };

    const endpoint = Path.grid;
    const method: Method = "get";
    const resp = await apiCall(postDataApi, endpoint, method);
    expect(HTTP_CODE_BAD_REQUEST).equals(resp.status);
  });

  it("delete method in grid should respod 400 ", async () => {
    const postDataApi = {
      x: 2,
      y: 2,
      orientation: "N",
    };

    const endpoint = Path.grid;
    const method: Method = "delete";
    const resp = await apiCall(postDataApi, endpoint, method);
    expect(HTTP_CODE_BAD_REQUEST).equals(resp.status);
  });
  it("options method in grid should respod 400 ", async () => {
    const postDataApi = {
      x: 2,
      y: 2,
      orientation: "N",
    };

    const endpoint = Path.grid;
    const method: Method = "options";
    const resp = await apiCall(postDataApi, endpoint, method);
    expect(HTTP_CODE_BAD_REQUEST).equals(resp.status);
  });
  it("post method in grid should respod 400 ", async () => {
    const postDataApi = {
      x: 2,
      y: 2,
      orientation: "N",
    };

    const endpoint = Path.grid;
    const method: Method = "post";
    const resp = await apiCall(postDataApi, endpoint, method);
    expect(HTTP_CODE_BAD_REQUEST).equals(resp.status);
  });
  it("patch method in grid should respod 400 ", async () => {
    const postDataApi = {
      x: 2,
      y: 2,
      orientation: "N",
    };

    const endpoint = Path.grid;
    const method: Method = "patch";
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
