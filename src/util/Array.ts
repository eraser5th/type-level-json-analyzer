type ArraySkipInner<
  T extends unknown[],
  N extends number,
  Acc extends never[],
> = T extends [unknown, ...infer R]
  ? Acc["length"] extends N
    ? T
    : ArraySkipInner<R, N, [...Acc, never]>
  : [];

export type ArraySkip<T extends unknown[], N extends number> = ArraySkipInner<
  T,
  N,
  []
>;

export type ArrayRemoveElement<
  A extends unknown[],
  Target extends unknown,
  AccResult extends unknown[] = [],
> = A extends [infer E, ...infer Rem]
  ? E extends Target
    ? ArrayRemoveElement<Rem, Target, AccResult>
    : ArrayRemoveElement<Rem, Target, [...AccResult, E]>
  : AccResult;

(function () {
  {
    type a = ArrayRemoveElement<["aaa", "", "bbb", ""], "">;
  }
});
