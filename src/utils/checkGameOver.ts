import { Coordinate } from "../types/types";

export const checkGameOver = (
  snakeHead: Coordinate,
  boundaries: any
): boolean =>
  snakeHead.x < boundaries.xMin ||
  snakeHead.x > boundaries.xMax ||
  snakeHead.y < boundaries.yMin ||
  snakeHead.y > boundaries.yMax;
