export interface MethodResult {
  name: string;
  result: number | null;
  time: number;
  complexity: string;
  error?: string;
}
