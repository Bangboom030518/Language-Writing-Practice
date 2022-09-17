const { readFileSync, writeFileSync } = require("fs");

const file = "public/spanish.txt";

const content = readFileSync(file, "utf-8");

const lines = content.split("\n");

const result = lines
  .map((line) => {
    const [term, definition] = line.split(" - ");
    return `${term} - ${definition.toLowerCase()}`;
  })
  .join("\n");

writeFileSync(file, result);
