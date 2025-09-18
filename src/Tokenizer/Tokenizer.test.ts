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

  // array
  {
    type a = Tokenizer<"[1,2,3]">;
    type b = [
      SimpleToken.LeftSquareBracket,
      NumberToken<1>,
      SimpleToken.Comma,
      NumberToken<2>,
      SimpleToken.Comma,
      NumberToken<3>,
      SimpleToken.RightSquareBracket,
      SimpleToken.End
    ];

    const _: Equal<a, b> = true;
  }

  // some tokens
  {
    type input = '[true]false{} \n\t 123"hoge"'
    type a = Tokenizer<input>;
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
  {
    type input = "[1, \"hoge\", 3]"
    type a = Tokenizer<input>;
    type b = [
      SimpleToken.LeftSquareBracket,
      NumberToken<1>,
      SimpleToken.Comma,
      SimpleToken.WhiteSpace,
      StringToken<"hoge">,
      SimpleToken.Comma,
      SimpleToken.WhiteSpace,
      NumberToken<3>,
      SimpleToken.RightSquareBracket,
      SimpleToken.End,
    ];
    const _: Equal<a, b> = true;
  }
  {
    type input = "[ ]"
    type a = Tokenizer<input>
    type b = [
      SimpleToken.LeftSquareBracket,
      SimpleToken.WhiteSpace,
      SimpleToken.RightSquareBracket,
      SimpleToken.End,
    ]

    const _: Equal<a, b> = true
  }
  {
    type input = "{ \"key\": 123 }"
    type result = Tokenizer<input>
    type expected = [
      SimpleToken.LeftBrace,
      SimpleToken.WhiteSpace,
      StringToken<"key">,
      SimpleToken.Colon,
      SimpleToken.WhiteSpace,
      NumberToken<123>,
      SimpleToken.WhiteSpace,
      SimpleToken.RightBrace,
      SimpleToken.End,
    ]

    const _: Equal<result, expected> = true
  }
})();
