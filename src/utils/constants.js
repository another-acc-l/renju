export const MIN_TESTS = 1;
export const MAX_TESTS = 11;

export const BOARD_SIZE = 19;
export const WIN_STREAK = 5;

export const Stone = Object.freeze({
  Empty: 0,
  Black: 1,
  White: 2,
});

export const DIRECTIONS = Object.freeze([
  Object.freeze({ row: 0, column: 1 }),
  Object.freeze({ row: 1, column: 0 }),
  Object.freeze({ row: 1, column: 1 }),
  Object.freeze({ row: 1, column: -1 }),
]);