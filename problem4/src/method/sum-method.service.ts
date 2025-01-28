/*
# Task

Provide 3 unique implementations of the following function in TypeScript.

- Comment on the complexity or efficiency of each function.

**Input**: `n` - any integer

*Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`*.

**Output**: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15.
*/

// Formula method
const formulaMethod = (n: number): number => {
  validateResult(n);
  return (n * (n + 1)) / 2;
};

// Bitwise method
const bitwiseMethod = (n: number): number => {
  validateResult(n);
  return n & 1 ? ((n + 1) >> 1) * n : (n >> 1) * (n + 1);
};

// While loop method
const whileLoopMethod = (n: number): number => {
  validateResult(n);
  let sum = 0;
  while (n > 0) sum += n--;
  return sum;
};

const validateResult = (n: number): boolean => {
  if (!Number.isSafeInteger(n) || n < 0) {
    throw new Error("Invalid input");
  }

  const maxN = Math.floor(
    (-1 + Math.sqrt(1 + 8 * Number.MAX_SAFE_INTEGER)) / 2
  );
  if (n > maxN) {
    throw new Error("Result would exceed MAX_SAFE_INTEGER");
  }

  return true;
};

export { formulaMethod, bitwiseMethod, whileLoopMethod };
