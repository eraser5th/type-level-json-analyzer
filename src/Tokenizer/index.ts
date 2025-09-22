import { SimpleToken, Token } from "../Token";
import {
  ColonTokenizer,
  CommaTokenizer,
  EndTokenizer,
  FalseTokenizer,
  LeftBraceTokenizer,
  LeftSquareBracketTokenizer,
  NullTokenizer,
  NumberTokenizer,
  RightBraceTokenizer,
  RightSquareBracketTokenizer,
  StringTokenizer,
  TrueTokenizer,
  WhiteSpaceTokenizer,
} from "./SubTokenizers";
import { SkipString } from "../util/String";

type TokenizeOnce<S extends string> =
  | RightBraceTokenizer<S>
  | LeftBraceTokenizer<S>
  | ColonTokenizer<S>
  | TrueTokenizer<S>
  | FalseTokenizer<S>
  | WhiteSpaceTokenizer<S>
  | NullTokenizer<S>
  | LeftSquareBracketTokenizer<S>
  | RightSquareBracketTokenizer<S>
  | StringTokenizer<S>
  | CommaTokenizer<S>
  | NumberTokenizer<S>;

type TokenizerInner<
  S extends string,
  AccTokens extends Token[] = [],
  End = EndTokenizer<S> extends never ? false : true,
  Result extends [Token, number] = TokenizeOnce<S>,
  NextToken extends Token = Result[0],
  ReadedLength extends number = Result[1],
> = End extends true
  ? [...AccTokens, SimpleToken.End]
  : Result extends never
    ? [...AccTokens, SimpleToken.Bad]
    : NextToken extends SimpleToken.Bad
      ? [...AccTokens, SimpleToken.Bad]
      : TokenizerInner<SkipString<S, ReadedLength>, [...AccTokens, NextToken]>;

export type Tokenizer<S extends string> = TokenizerInner<S>;
