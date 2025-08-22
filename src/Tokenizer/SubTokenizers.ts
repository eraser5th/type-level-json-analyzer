import { NumberToken, SimpleToken, StringToken } from "../Token";
import { AssignableAtoB } from "../util/AssignableAtoB";
import { Equal } from "../util/Equal";
import { JoinToString } from "../util/String";

export type EndTokenizer<S> = S extends "" ? [SimpleToken.End, 0] : never;

export type WhiteSpaceTokenizer<S> =
  S extends `${" " | "\t" | "\v" | "\f" | "\r" | "\n"}${infer _}`
  ? [SimpleToken.WhiteSpace, 1]
  : never;

(function test() {
  {
    type a = WhiteSpaceTokenizer<" ">;
    type b = [SimpleToken.WhiteSpace, 1];

    const _: Equal<a, b> = true;
  }

  {
    type a = WhiteSpaceTokenizer<"\t">;
    type b = [SimpleToken.WhiteSpace, 1];

    const _: Equal<a, b> = true;
  }

  {
    type a = WhiteSpaceTokenizer<"\n">;
    type b = [SimpleToken.WhiteSpace, 1];

    const _: Equal<a, b> = true;
  }
})();

export type ColonTokenizer<S> = S extends `:${infer _}`
  ? [SimpleToken.Colon, 1]
  : never;

(function test() {
  {
    type a = ColonTokenizer<":">;
    type b = [SimpleToken.Colon, 1];

    const _: Equal<a, b> = true;
  }
})();

export type CommaTokenizer<S> = S extends `,${infer _}`
  ? [SimpleToken.Comma, 1]
  : never;

export type LeftBraceTokenizer<S> = S extends `{${infer _}`
  ? [SimpleToken.LeftBrace, 1]
  : never;

export type RightBraceTokenizer<S> = S extends `}${infer _}`
  ? [SimpleToken.RightBrace, 1]
  : never;

export type LeftSquareBracketTokenizer<S> = S extends `[${infer _}`
  ? [SimpleToken.LeftSquareBracket, 1]
  : never;

export type RightSquareBracketTokenizer<S> = S extends `]${infer _}`
  ? [SimpleToken.RightSquareBracket, 1]
  : never;

export type TrueTokenizer<S> = S extends `true${infer _}`
  ? [SimpleToken.True, 4]
  : never;

export type FalseTokenizer<S> = S extends `false${infer _}`
  ? [SimpleToken.False, 5]
  : never;

export type NullTokenizer<S> = S extends `null${infer _}`
  ? [SimpleToken.Null, 4]
  : never;

export type StringTokenizerInner<
  S,
  AccResult extends string = "",
  AccReadedLength extends never[] = [],
> = S extends `${infer Head}${infer Tail}`
  ? Head extends `"`
  ? [StringToken<AccResult>, [...AccReadedLength, never, never]["length"]]
  : StringTokenizerInner<
    Tail,
    `${AccResult}${Head}`,
    [...AccReadedLength, never]
  >
  : [SimpleToken.Bad, 0];

export type StringTokenizer<S> = S extends `"${infer Tail}`
  ? StringTokenizerInner<Tail>
  : never;

(function test() {
  {
    type a = StringTokenizer<"hoge">;

    const n = 1;
    if (n !== 1) {
      const _: a = n;
    }
  }

  {
    type a = StringTokenizer<'{"}'>;

    const n = 1;
    if (n !== 1) {
      const _: a = n;
    }
  }

  {
    type a = StringTokenizer<'""'>;
    type b = [StringToken<"">, 2];

    const _: AssignableAtoB<a, b> = true;
  }
  {
    type a = StringTokenizer<'"aaa"'>;
    type b = [StringToken<"aaa">, 5];

    const _: AssignableAtoB<a, b> = true;
  }

  {
    type a = StringTokenizer<'"aaabbbb"'>;
    type b = [StringToken<"aaabbbb">, 9];

    const _: AssignableAtoB<a, b> = true;
  }

  {
    type a = StringTokenizer<'"aaabbbb'>;
    type b = [SimpleToken.Bad, 0];
    const _: AssignableAtoB<a, b> = true;
  }
})();

type Numeric = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type NumericChar = `${Numeric}`;

export type NumberTokenizerInner<
  S,
  AccResult extends string = "",
  AccReadedLength extends never[] = [],
> = S extends `${infer Head extends NumericChar}${infer Tail}`
  ? NumberTokenizerInner<
    Tail,
    `${AccResult}${Head}`,
    [...AccReadedLength, never]
  >
  : AccResult extends ""
  ? never
  : [
    NumberToken<ParseInt<AccResult>>,
    AccReadedLength["length"],
  ];

export type NumberTokenizer<S> = NumberTokenizerInner<S>;

(function() {
  {
    type a = NumberTokenizer<"123">
    type b = [NumberToken<123>, 3]

    const _: Equal<a, b> = true
  }

  {
    type a = NumberTokenizer<"123456789">
    type b = [NumberToken<123456789>, 9]

    const _: Equal<a, b> = true
  }
})()
