import fs from "fs";

export const readFileSync = (file) => {
  if (!fs.existsSync(file)) {
    throw new Error(`File ${file} not found`);
  }

  let data;
  try {
    data = fs.readFileSync(file, { encoding: "utf-8" });
  } catch (error) {
    throw new Error(`Error reading file from ${file}: ${error.message}`);
  }
  return data;
};

export const writeFileSync = (file, data) => {
  try {
    fs.writeFileSync(file, data.join('\n'), { encoding: "utf-8" });
  } catch (error) {
    throw new Error(`Error writing to file ${file}: ${error.message}`);
  }
};