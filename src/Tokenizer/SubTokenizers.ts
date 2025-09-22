import type { NumberToken, SimpleToken, StringToken } from "../Token";
import type { AssignableAtoB } from "../util/AssignableAtoB";
import type { Equal } from "../util/Equal";
import type { StringLength } from "../util/String";
import type { ReadNumber } from "../util/Number";

export type EndTokenizer<S> = S extends "" ? [SimpleToken.End, 0] : never;

export type WhiteSpaceTokenizer<S> =
  S extends `${" " | "\t" | "\v" | "\f" | "\r" | "\n"}${string}`
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

export type ColonTokenizer<S> = S extends `:${string}`
  ? [SimpleToken.Colon, 1]
  : never;

(function test() {
  {
    type a = ColonTokenizer<":">;
    type b = [SimpleToken.Colon, 1];

    const _: Equal<a, b> = true;
  }
})();

export type CommaTokenizer<S> = S extends `,${string}`
  ? [SimpleToken.Comma, 1]
  : never;

export type LeftBraceTokenizer<S> = S extends `{${string}`
  ? [SimpleToken.LeftBrace, 1]
  : never;

export type RightBraceTokenizer<S> = S extends `}${string}`
  ? [SimpleToken.RightBrace, 1]
  : never;

export type LeftSquareBracketTokenizer<S> = S extends `[${string}`
  ? [SimpleToken.LeftSquareBracket, 1]
  : never;

export type RightSquareBracketTokenizer<S> = S extends `]${string}`
  ? [SimpleToken.RightSquareBracket, 1]
  : never;

export type TrueTokenizer<S> = S extends `true${string}`
  ? [SimpleToken.True, 4]
  : never;

export type FalseTokenizer<S> = S extends `false${string}`
  ? [SimpleToken.False, 5]
  : never;

export type NullTokenizer<S> = S extends `null${string}`
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
      _;
    }
  }

  {
    type a = StringTokenizer<'""'>;
    type b = [StringToken<"">, 2];

    const _: AssignableAtoB<a, b> = true;
    _;
  }
  {
    type a = StringTokenizer<'"aaa"'>;
    type b = [StringToken<"aaa">, 5];

    const _: AssignableAtoB<a, b> = true;
    _;
  }

  {
    type a = StringTokenizer<'"aaabbbb"'>;
    type b = [StringToken<"aaabbbb">, 9];

    const _: AssignableAtoB<a, b> = true;
    _;
  }

  {
    type a = StringTokenizer<'"aaabbbb'>;
    type b = [SimpleToken.Bad, 0];
    const _: AssignableAtoB<a, b> = true;
    _;
  }
})();

export type NumberTokenizer<
  S,
  ReadedNumber extends number = ReadNumber<S>,
> = ReadedNumber extends never
  ? never
  : [NumberToken<ReadedNumber>, StringLength<`${ReadedNumber}`>];

(function () {
  {
    type a = NumberTokenizer<"123">;
    type b = [NumberToken<123>, 3];

    const _: Equal<a, b> = true;
    _;
  }

  {
    type a = NumberTokenizer<"123456789">;
    type b = [NumberToken<123456789>, 9];

    const _: Equal<a, b> = true;
    _;
  }

  {
    type a = NumberTokenizer<"123abc">;
    type b = [NumberToken<123>, 3];
    const _: Equal<a, b> = true;
    _;
  }
  {
    type a = NumberTokenizer<"-123abc">;
    type b = [NumberToken<-123>, 4];
    const _: Equal<a, b> = true;
    _;
  }
  {
    type a = NumberTokenizer<" ">;
    const _never = 1;
    if (_never !== 1) {
      const _: a = _never;
      _;
    }
  }
})();
