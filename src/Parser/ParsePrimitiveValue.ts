import type { SimpleToken, StringToken, NumberToken, Token } from "../Token";
import { UnexpectedToken } from "./Error";

type ParseStringValue<Tokens extends Token[]> = Tokens extends [
  StringToken<infer S>,
  ...infer Remain,
]
  ? [S, Remain]
  : never;

type ParseNumberValue<Tokens extends Token[]> = Tokens extends [
  NumberToken<infer N>,
  ...infer Remain,
]
  ? [N, Remain]
  : never;

type ParseBooleanValue<T extends Token[]> = T extends [
  SimpleToken.True,
  ...infer Remain,
]
  ? [true, Remain]
  : T extends [SimpleToken.False, ...infer Remain]
    ? [false, Remain]
    : never;

type ParseNullValue<T extends Token[]> = T extends [
  SimpleToken.Null,
  ...infer Remain,
]
  ? [null, Remain]
  : never;

// Badに遭遇
type EncounteredBad<Tokens extends Token[]> = Tokens extends [
  SimpleToken.Bad,
  ...infer Remain,
]
  ? [UnexpectedToken<SimpleToken.Bad>, Remain]
  : never;

export type ParsePrimitiveValue<Tokens extends Token[]> =
  | ParseStringValue<Tokens>
  | ParseNumberValue<Tokens>
  | ParseBooleanValue<Tokens>
  | ParseNullValue<Tokens>
  | EncounteredBad<Tokens>;

(function test_ParsePrimitiveValue() {
  {
    type a = ParsePrimitiveValue<[StringToken<"hello">]>;
    type b = ["hello", []];
    const _: a extends b ? true : false = true;
    _;
  }
  {
    type a = ParsePrimitiveValue<[NumberToken<123>]>;
    type b = [123, []];
    const _: a extends b ? true : false = true;
    _;
  }
  {
    type a = ParsePrimitiveValue<[SimpleToken.True]>;
    type b = [true, []];
    const _: a extends b ? true : false = true;
    _;
  }
  {
    type a = ParsePrimitiveValue<[SimpleToken.Null]>;
    type b = [null, []];
    const _: a extends b ? true : false = true;
    _;
  }
  {
    type a = ParsePrimitiveValue<[SimpleToken.False]>;
    type b = [false, []];
    const _: a extends b ? true : false = true;
    _;
  }
  {
    type a = ParsePrimitiveValue<[SimpleToken.Bad]>;
    const _never = 1;
    if (_never !== 1) {
      const _: a = _never;
      _;
    }
  }
  {
    type a = ParsePrimitiveValue<[SimpleToken.End]>;
    type b = never;
    const _: a extends b ? true : false = true;
    _;
  }
  // Multiple tokens
  {
    type a = ParsePrimitiveValue<[StringToken<"hello">, SimpleToken.End]>;
    type b = ["hello", [SimpleToken.End]];
    const _: a extends b ? true : false = true;
    _;
  }
})();
