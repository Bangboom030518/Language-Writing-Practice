const { readFileSync, writeFileSync } = require("fs");

const file = "public/french-module-1-vocab-2.txt"

const content = readFileSync(file, "utf-8");

const lines = content.split("\n");

const result = lines
  .map((line) => {
    const arr = line.split(" - ");
    arr.reverse();
    return arr.join(" - ");
  })
  .join("\n")

writeFileSync(file, result)