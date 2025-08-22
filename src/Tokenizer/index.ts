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

`
{
  "hoge": "fuga",
}
`;

type TokenizerInner<
  S extends string,
  AccTokens extends Token[] = [],
  // aliases
  End = EndTokenizer<S> extends never ? false : true,
  NextToken extends [Token, number] =
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
    | NumberTokenizer<S>,
> = End extends true
  ? [...AccTokens, SimpleToken.End]
  : NextToken extends never
    ? [...AccTokens, SimpleToken.Bad]
    : NextToken[0] extends SimpleToken.Bad
      ? [...AccTokens, SimpleToken.Bad]
      : TokenizerInner<
          SkipString<S, NextToken[1]>,
          [...AccTokens, NextToken[0]]
        >;

export type Tokenizer<S extends string> = TokenizerInner<S>;
