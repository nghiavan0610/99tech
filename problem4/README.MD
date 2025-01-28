# Sum Function

## Overview

This project provides three unique implementations of a function that calculates the summation of all integers from 1 to `n` in TypeScript which I think are the fastest and most optimized. The implementations are located in the `src/method/sum-method.service.ts` file. Each method is designed to demonstrate different approaches to solving the same problem, along with comments on their complexity and efficiency.
There are other files I created for display styling so you can run tests more conveniently

## Implementations

1. **Formula Method**

   - **Description**: This method uses the mathematical formula for the sum of the first `n` integers: \( \text{sum} = \frac{n(n + 1)}{2} \).
   - **Complexity**:
     - Time: O(1) (constant time)
     - Space: O(1) (constant space)

2. **Bitwise Method**

   - **Description**: This method utilizes bitwise operations to compute the sum. It checks if `n` is odd or even and calculates the sum accordingly.
   - **Complexity**:
     - Time: O(1) (constant time)
     - Space: O(1) (constant space)

3. **While Loop Method**
   - **Description**: This method iteratively sums the integers from `n` down to 1 using a while loop.
   - **Complexity**:
     - Time: O(n) (linear time)
     - Space: O(1) (constant space)

## Usage

To run the code, follow these steps:

1. Clone the repository or download the source code.
2. Navigate to the project directory in your command line.
3. Install the necessary dependencies by running:
   ```bash
   npm install
   ```
4. Start the application using:
   ```bash
   npm run start
   ```
5. When prompted, enter a non-negative integer value for `n`. The program will display the results of each summation method along with their execution times.

## Note

Ensure that the input value for `n` is a non-negative integer and does not exceed the maximum safe integer limit in JavaScript (`Number.MAX_SAFE_INTEGER`).
