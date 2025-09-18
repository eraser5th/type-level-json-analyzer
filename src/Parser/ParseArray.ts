import type { JsonValue } from '../Json';
import type { NumberToken, SimpleToken, StringToken, Token } from '../Token';
import type { ArraySkip } from '../util/Array';
import { Equal } from '../util/Equal';
import type { UnexpectedToken } from './Error';
import type { ParsePrimitiveValue } from './ParsePrimitiveValue';

export type ParseArray<Tokens extends Token[]> =
  Tokens extends [SimpleToken.LeftSquareBracket, ...infer RemainTokens extends Token[]]
  ? ParseArrayElements<RemainTokens>
  : never

type ParseArrayElements<
  Tokens extends Token[],
  AccElements extends unknown[] = [],
  // TODO: ネストされたオブジェクト、配列のサポート
  ParseResult = ParsePrimitiveValue<Tokens>
> =
  Tokens extends [SimpleToken.RightSquareBracket, ...infer AfterArrayTokens extends Token[]]
  // 閉じカッコが来たら終了
  ? [AccElements, AfterArrayTokens]
  : ParseResult extends [infer Element extends JsonValue, infer RemainTokens extends Token[]]
  ? RemainTokens extends [SimpleToken.Comma, ...infer NextTokens extends Token[]]
  // 要素の後にカンマが来たら次の要素へ
  ? ParseArrayElements<NextTokens, [...AccElements, Element]>
  : RemainTokens extends [SimpleToken.RightSquareBracket, ...infer AfterArrayTokens extends Token[]]
  // 要素の後に閉じカッコが来たら終了
  ? [[...AccElements, Element], AfterArrayTokens]
  // 要素の後に不正なトークンが来たらエラー
  : [UnexpectedToken<RemainTokens[0]>, RemainTokens]
  // 要素が来なかったらエラー
  : [UnexpectedToken<Tokens[0]>, Tokens]


(function test() {
  {
    type result = ParseArray<[SimpleToken.LeftSquareBracket, SimpleToken.RightSquareBracket, SimpleToken.End]>
    type expected = [[], [SimpleToken.End]]

    const _: Equal<result, expected> = true
  }
  {
    type result = ParseArray<[
      SimpleToken.LeftSquareBracket,
      NumberToken<1>,
      SimpleToken.Comma,
      NumberToken<2>,
      SimpleToken.RightSquareBracket,
      SimpleToken.End]
    >
    type expected = [[1, 2], [SimpleToken.End]]

    const _: Equal<result, expected> = true
  }
  {
    type result = ParseArray<[SimpleToken.LeftSquareBracket, NumberToken<1>, SimpleToken.Comma, SimpleToken.Bad, SimpleToken.RightSquareBracket, SimpleToken.End]>
    type expected = [[UnexpectedToken<SimpleToken.Bad>, [SimpleToken.Bad, SimpleToken.RightSquareBracket, SimpleToken.End]]]

    const _: Equal<result, expected> = true
  }
  {
    type result = ParseArray<[
      SimpleToken.LeftSquareBracket,
      NumberToken<1>,
      SimpleToken.Comma,
      StringToken<"hoge">,
      SimpleToken.Comma,
      NumberToken<3>,
      SimpleToken.RightSquareBracket,
      SimpleToken.End
    ]>
    type expected = [[1, "hoge", 3], [SimpleToken.End]]
    const _: Equal<result, expected> = true
  }
})() 
