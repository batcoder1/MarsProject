export enum Orientation {
  NORTH = "N",
  EAST = "E",
  WEST = "W",
  SOUTH = "S",
}
export enum Path {
  status = "/status",
  robot = "/robot",
  grid = "/grid",
  commands = "/commands",
}
export const BASE_URL = "http://localhost:9091";

// interfaces- types

export const ROBOT = "Robot";
export const GRID = "Grid";
export const COMMANDS = "Commands";

export const interfaceTypes = new Set([ROBOT, GRID, COMMANDS]);

export const BAD_REQUEST = "Bad Request";
export const NOT_FOUND = "Not Found";
export const GROUP_NOT_FOUND = "Group not found";
export const CONTENT_TYPE_VALID = [
  "application/x-www-form-urlencoded;charset=utf-8",
  "application/x-www-form-urlencoded;",
  "application/x-www-form-urlencoded",
];

// HTTP Response codes
export const HTTP_CODE_NOT_FOUND = 404;
export const HTTP_CODE_OK = 200;
export const HTTP_CODE_BAD_REQUEST = 400;
