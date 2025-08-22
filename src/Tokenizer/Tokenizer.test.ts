import { Tokenizer } from ".";
import { NumberToken, SimpleToken, StringToken } from "../Token";
import { Equal } from "../util/Equal";

(function test() {
  // empty
  {
    type a = Tokenizer<"">;
    type b = [SimpleToken.End];

    const _: Equal<a, b> = true;
  }

  // string
  {
    type a = Tokenizer<'"aaa"'>;
    type b = [StringToken<"aaa">, SimpleToken.End];

    const _: Equal<a, b> = true;
  }

  // bad string
  {
    type a = Tokenizer<'"aaabbbb'>;
    type b = [SimpleToken.Bad];

    const _: Equal<a, b> = true;
  }

  // number
  {
    type a = Tokenizer<"1234">;
    type b = [NumberToken<1234>, SimpleToken.End];

    const _: Equal<a, b> = true;
  }

  // some tokens
  {
    type a = Tokenizer<'[true]false{} \n\t 123"hoge"'>;
    type b = [
      SimpleToken.LeftSquareBracket,
      SimpleToken.True,
      SimpleToken.RightSquareBracket,
      SimpleToken.False,
      SimpleToken.LeftBrace,
      SimpleToken.RightBrace,
      SimpleToken.WhiteSpace,
      SimpleToken.WhiteSpace,
      SimpleToken.WhiteSpace,
      SimpleToken.WhiteSpace,
      NumberToken<123>,
      StringToken<"hoge">,
      SimpleToken.End,
    ];

    const _: Equal<a, b> = true;
  }
})();
