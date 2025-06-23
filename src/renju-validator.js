import {
  Stone,
  WIN_STREAK,
  BOARD_SIZE,
  DIRECTIONS,
} from "./utils/constants.js";

//checks coords are on the board
const isInBounds = ({ row, column }) =>
  row >= 0 && row < BOARD_SIZE && column >= 0 && column < BOARD_SIZE;

//returns stone type, otherwise returns null
const getStone = (board, { row, column }) =>
  isInBounds({ row, column }) ? board[row][column] : null;

const isSameStone = (stone1, stone2) => stone1 === stone2;

//checks the similarity of stones on the board by coords
const isStoneAtOffset = (board, row, column, direction, offset, stone) => {
  const target = {
    row: row + direction.row * offset,
    column: column + direction.column * offset,
  };
  return isSameStone(stone, getStone(board, target));
};

//checks line for win streak
const isWinningLine = (board, row, column, direction, stone) => {
  //checks previous stone
  if (isStoneAtOffset(board, row, column, direction, -1, stone)) return false;

  //checks 5 stone in a line
  for (let i = 0; i < WIN_STREAK; i++) {
    if (!isStoneAtOffset(board, row, column, direction, i, stone)) return false;
  }

  //checks stone after 5th to avoid >5 streak, if streak is 5 returns true, otherwise false
  return !isStoneAtOffset(board, row, column, direction, WIN_STREAK, stone)
};

//checks all possible winning lines for cell
const hasWinningLine = (board, row, column, stone) =>
  DIRECTIONS.some((direction) =>
    isWinningLine(board, row, column, direction, stone)
  );

//finds the winner in the board
const findWinner = (board) => {
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let column = 0; column < BOARD_SIZE; column++) {
      const stone = board[row][column];

      if (stone === Stone.Empty) continue;

      if (hasWinningLine(board, row, column, stone)) {
        return { stone, start: { row: row + 1, column: column + 1 } };
      }
    }
  }
  return { stone: Stone.Empty };
};

//process boards to find winners
export const processBoards = (boards) =>
  boards.flatMap((board) => {
    const { stone, start } = findWinner(board);
    return stone === Stone.Empty
      ? [`${stone}`]
      : [`${stone}`, `${start.row} ${start.column}`];
  });
