import { Equal, LengthEqual } from "./Equal";

export type SplitString<
  S extends string,
  Acc extends string[] = [],
> = S extends `${infer Head}${infer Tail}`
  ? Head extends ""
  ? []
  : SplitString<Tail, [...Acc, Head]>
  : Acc;

(function test_SplitString() {
  {
    type a = SplitString<"">;
    const _: a = [];
  }
  {
    type a = SplitString<"a">;
    const _: a = ["a"];
  }
  {
    type a = SplitString<"ab">;
    const _: a = ["a", "b"];
  }
  {
    type a = SplitString<"abc">;
    const _: a = ["a", "b", "c"];
  }
  {
    type a = SplitString<"あいうえお">;
    const _: a = ["あ", "い", "う", "え", "お"];
  }
  {
    type a = SplitString<"漢字は？">;
    const _: a = ["漢", "字", "は", "？"];
  }
})();

export type SkipString<
  S extends string,
  N extends number,
  Acc extends never[] = [],
> = Acc["length"] extends N
  ? S
  : S extends `${infer _}${infer Tail}`
  ? SkipString<Tail, N, [...Acc, never]>
  : "";

(function test_SkipString() {
  {
    type a = SkipString<"", 0>;
    const _: a = "";
  }

  {
    type a = SkipString<"a", 0>;
    const _: a = "a";
  }

  {
    type a = SkipString<"ab", 0>;
    const _: a = "ab";
  }

  {
    type a = SkipString<"ab", 1>;
    const _: a = "b";
  }

  {
    type a = SkipString<"ab", 2>;
    const _: a = "";
  }

  {
    type a = SkipString<"abcde", 2>;
    const _: a = "cde";
  }

  {
    type a = SkipString<"", 1>;
    const _: a = "";
  }
})();

export type JoinToString<
  A extends string[],
  Sep extends string = "",
  Acc extends string = "",
  ia extends never[] = [],
> =
  LengthEqual<A, []> extends true
  ? ""
  : LengthEqual<A, ia> extends true
  ? Acc
  : JoinToString<A, Sep, `${Acc}${A[Acc["length"]]}`, [...ia, never]>;

(function test_JoinToString() {
  {
    type a = JoinToString<[]>;
    const _: a = "";
  }

  {
    type a = JoinToString<["a"]>;
    const _: a = "a";
  }

  {
    type a = JoinToString<["a", "b"]>;
    const _: a = "ab";
  }

  {
    type a = JoinToString<["a", "b", "c"]>;
    const _: a = "abc";
  }
})();

export type StringLength<
  S extends string,
  Acc extends never[] = [],
> = S extends `${infer _}${infer Tail}`
  ? StringLength<Tail, [...Acc, never]>
  : Acc["length"];
