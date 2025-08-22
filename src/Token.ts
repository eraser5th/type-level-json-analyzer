export type Keyword = "true" | "false" | "null" | "true" | "false" | "null";

export type StringToken<V extends string = ""> = {
  type: "String";
  value: V;
};

type Numeric = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type NumberToken<V extends number = 0> = {
  type: "Number";
  value: V;
};

export enum SimpleToken {
  LeftBrace,
  RightBrace,
  LeftSquareBracket,
  RightSquareBracket,
  Colon,
  Comma,
  String,
  Number,
  True,
  False,
  Null,
  Bad,
  End,
  WhiteSpace,
}

export type Token = SimpleToken | StringToken | NumberToken;

type ParseInt<T> = T extends `${infer N extends number}` ? N : never;

type T0 = ParseInt<"1">; // 1
type T1 = ParseInt<"100">; // 100
type T2 = ParseInt<"-13">; // -13
type T3 = ParseInt<"abc">; // never
