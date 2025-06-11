import { processBoards } from './renju-validator.js';
import {readFileSync, writeFileSync} from './utils/fileUtils.js';
import { parseInput } from './utils/parser.js';

const inputFile = "src/data/input.txt";
const outputFile = "src/data/output.txt";

try {
    const data = readFileSync(inputFile);
    const boards = parseInput(data);
    const results = processBoards(boards);
    console.log(`${results.join('\n')}`);
    writeFileSync(outputFile, results);
} catch (error) {
    console.error(`Error : ${error.message}`);
    process.exit(1);
}