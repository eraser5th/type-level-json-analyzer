import { JsonObject, JsonValue } from '../Json'
import type { Token, SimpleToken, StringToken, NumberToken } from '../Token'
import { Equal } from '../util/Equal'
import { Object } from '../util/Object'
import type { UnexpectedToken } from './Error'
import { ParsePrimitiveValue } from './ParsePrimitiveValue'

type ParseFieldOnce<Tokens extends Token[]> = Tokens extends [StringToken<infer Key>, SimpleToken.Colon, ...infer Tail extends Token[]]
  ? ParsePrimitiveValue<Tail> extends [infer Value extends JsonValue, infer RemainTokens extends Token[]]
  ? [{ [k in Key]: Value }, RemainTokens]
  : [UnexpectedToken<Tail[0]>, Tail]
  : [UnexpectedToken<Tokens[0]>, Tokens]

type ParseFields<
  Tokens extends Token[],
  Acc extends object = {},
> = ParseFieldOnce<Tokens> extends [infer Field extends JsonObject, infer RemainTokens extends Token[]]
  ? RemainTokens extends [SimpleToken.Comma, ...infer RemainTokens extends Token[]]
  ? ParseFields<RemainTokens, Object.Merge<Acc, Field>>
  : RemainTokens extends [SimpleToken.RightBrace, ...infer RemainTokens extends Token[]]
  ? [Object.Merge<Acc, Field>, RemainTokens]
  : [UnexpectedToken<RemainTokens[0]>, RemainTokens]
  : [UnexpectedToken<Tokens[0]>, Tokens]

export type ParseObject<Tokens extends Token[]> =
  Tokens extends [SimpleToken.LeftBrace, SimpleToken.RightBrace, ...infer RemainTokens extends Token[]]
  ? [{}, RemainTokens]
  : Tokens extends [SimpleToken.LeftBrace, ...infer RemainTokens extends Token[]]
  ? ParseFields<RemainTokens>
  : never

(function() {
  {
    type input = [SimpleToken.LeftBrace, SimpleToken.RightBrace]
    type result = ParseObject<input>
    type expected = [{}, []]

    const _: Equal<result, expected> = true
  }

  {
    type input = [
      SimpleToken.LeftBrace,
      StringToken<"hoge">,
      SimpleToken.Colon,
      NumberToken<123>,
      SimpleToken.RightBrace
    ]
    type result = ParseObject<input>
    type expected = [{ hoge: 123 }, []]

    const _: Equal<result, expected> = true
  }
})();

(function() {
  {
    type input = [
      StringToken<"hoge">,
      SimpleToken.Colon,
      NumberToken<123>,
    ]
    type result = ParseFieldOnce<input>
    type expected = [{ hoge: 123 }, []]

    const _: Equal<result, expected> = true
  }
});
