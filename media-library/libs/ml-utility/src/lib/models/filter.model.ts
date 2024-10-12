export interface MlFilter<TValue = unknown> {
  name: string;
  value: TValue;
  comparer?: (valueToCompare: TValue) => boolean
}