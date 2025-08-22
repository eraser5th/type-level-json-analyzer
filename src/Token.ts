export type Keyword = "true" | "false" | "null" | "true" | "false" | "null";

export type StringToken<V extends string = ""> = {
  type: "String";
  value: V;
};

type Numeric = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type NumberToken<V extends number = number> = {
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

(function testParseInt() {
  {
    type result = ParseInt<"1">; // 1
    const _: result = 1;
    _
  }
  {
    type result = ParseInt<"123">; // 123
    const _: result = 123;
    _
  }
  {
    type result = ParseInt<"-12">; // 0
    const _: result = -12;
    _
  }
  {
    type result = ParseInt<"ab">; // never

    let x: undefined = undefined;
    if (x === undefined) {
    } else {
      const _: result = x;
      _
    }
  }
})()
