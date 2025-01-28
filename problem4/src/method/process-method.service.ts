import { measurePerformance } from "./method.helper";
import { MethodResult } from "./result.interface";
import {
  formulaMethod,
  bitwiseMethod,
  whileLoopMethod,
} from "./sum-method.service";

const processMethod = (n: number) => {
  console.log(`\nTesting with input: ${n.toLocaleString()}`);
  console.log(
    "Maximum safe result possible:",
    Math.floor(
      (-1 + Math.sqrt(1 + 8 * Number.MAX_SAFE_INTEGER)) / 2
    ).toLocaleString()
  );
  console.log("MAX_SAFE_INTEGER:", Number.MAX_SAFE_INTEGER.toLocaleString());
  console.log();

  const methods = [
    {
      name: "Formula Method",
      fn: formulaMethod,
      complexity: "Time: O(1), Space: O(1)",
    },
    {
      name: "Bitwise Method",
      fn: bitwiseMethod,
      complexity: "Time: O(1), Space: O(1)",
    },
    {
      name: "While Loop Method",
      fn: whileLoopMethod,
      complexity: "Time: O(n), Space: O(1)",
    },
  ];

  const results: MethodResult[] = methods.map(({ name, fn, complexity }) => {
    try {
      const { result, time } = measurePerformance(fn, n);
      return { name, result, time, complexity } as MethodResult;
    } catch (error) {
      return {
        name,
        result: null,
        time: Infinity,
        complexity,
        error: (error as Error).message,
      } as MethodResult;
    }
  });

  // Check if there are any successful results
  const successfulResults = results.filter(({ error }) => !error);

  // Find the fastest method only among successful results
  const fastest = successfulResults.length
    ? successfulResults.reduce((a, b) => (a.time < b.time ? a : b))
    : null;

  results.forEach(({ name, result, time, complexity, error }) => {
    const isFastest = fastest && name === fastest.name ? " << Fastest >>" : "";
    console.log(`${name}${isFastest}`);
    if (error) {
      console.log(`Error: ${error}\n`);
    } else {
      console.log(`Result: ${result!.toLocaleString()}`);
      console.log(`Time: ${time.toFixed(6)}ms`);
      console.log(`Complexity: ${complexity}`);
      console.log();
    }
  });
};

export { processMethod };
