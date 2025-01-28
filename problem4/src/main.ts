import * as readline from "readline";
import { processMethod } from "./method/process-method.service";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function main() {
  rl.question("Enter a number: ", (input) => {
    const n = parseInt(input, 10);

    if (isNaN(n) || !Number.isSafeInteger(n) || n < 0) {
      console.log("Please enter a valid non-negative integer");
      rl.close();
      return;
    }

    processMethod(n);
    rl.close();
  });
}

main();
