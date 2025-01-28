const measurePerformance = (
  fn: (n: number) => number,
  n: number
): { result: number; time: number } => {
  const start = process.hrtime.bigint();
  const result = fn(n);
  const end = process.hrtime.bigint();
  const time = Number(end - start) / 1000000; // Convert to milliseconds
  return { result, time };
};

export { measurePerformance };
