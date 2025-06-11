import { MIN_TESTS, MAX_TESTS, BOARD_SIZE, Stone } from "./constants.js";

// Checks if the stone value is valid
const isValidStone = (value) =>
    value === Stone.Empty || value === Stone.Black || value === Stone.White;

// Parses a single row of the board
const parseBoardRow = (row, testNumber) => {
    const rowData = row.trim().split(/\s+/).map(Number);

    if (rowData.length !== BOARD_SIZE) {
        throw new Error(`Test ${testNumber}. Invalid number of columns`);
    }

    return rowData.map((value) => {
        if (!isValidStone(value)) {
            throw new Error(`Test ${testNumber}. Invalid stone value`);
        }

        return value;
    });
};

// Parses the board from the input lines
const parseBoard = (lines, startLineIndex, testNumber) =>
    lines
        .slice(startLineIndex, startLineIndex + BOARD_SIZE)
        .map((row) => parseBoardRow(row, testNumber));

// Parses the number of tests from the first line of input
const parseTestsCount = (data) => {
    const count = parseInt(data, 10);

    if (isNaN(count) || count < MIN_TESTS || count > MAX_TESTS) {
        throw new Error(`Invalid number of tests.`);
    }

    return count;
};

//parses the input data into an array of boards
export const parseInput = (input) => {
    const lines = input
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

    if (lines.length === 0) {
        throw new Error("Input file is empty");
    }

    let lineIndex = 0;

    const numberOfTests = parseTestsCount(lines[lineIndex]);

    lineIndex++;

    const requiredLines = numberOfTests * BOARD_SIZE + 1;

    if (lines.length < requiredLines) {
        throw new Error(`Not enough data for ${numberOfTests} tests`);
    }

    const boards = [];

    for (let i = 0; i < numberOfTests; i++) {
        const board = parseBoard(lines, lineIndex, i + 1);
        boards.push(board);
        lineIndex += BOARD_SIZE;
    }

    return boards;
};
