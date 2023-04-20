export type StrengthFunction = (value: string, _: AbortSignal) => number;
export type AsyncStrengthFunction = (
	value: string,
	signal: AbortSignal
) => Promise<number>;
export type AnyStrengthFunction = StrengthFunction | AsyncStrengthFunction;
