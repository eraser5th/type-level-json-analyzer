import type { Equal } from "./Equal";
import type { StringLength } from "./String";

export type ParseInt<T extends string> = T extends `${infer N extends number}`
  ? N
  : never;

(function test_ParseInt() {
  {
    type a = ParseInt<"123">;
    type b = 123;
    const _: Equal<a, b> = true;
  }
  {
    type a = ParseInt<"-123">;
    type b = -123;
    const _: Equal<a, b> = true;
  }
  {
    type a = ParseInt<"0">;
    type b = 0;
    const _: Equal<a, b> = true;
  }
  {
    type a = ParseInt<"9999999999">;
    type b = 9999999999;
    const _: Equal<a, b> = true;
  }
})();

// TODO: 小数点の対応
export type ReadNumber<S, Acc extends string = ""> = S extends ` ${string}` // 空白文字がなぜかnumberとして認識されるため明示的に除外
  ? ParseInt<Acc>
  : StringLength<Acc> extends 0
    ? // 最初の一文字目は-かもしれない
      S extends `${infer _ extends "-"}${infer Tail}`
      ? ReadNumber<Tail, "-">
      : S extends `${infer Num extends number}${infer Tail}`
        ? ReadNumber<Tail, `${Num}`>
        : // 最初の一文字目が数字でも-でもない場合はnever
          never
    : // 2文字目以降の読み取り
      S extends `${infer Num extends number}${infer Tail}`
      ? ReadNumber<Tail, `${Acc}${Num}`>
      : ParseInt<Acc>;

(function test_ReadNumber() {
  {
    type a = ReadNumber<"123">;
    type b = 123;
    const _: Equal<a, b> = true;
  }
  {
    type a = ReadNumber<"-123">;
    type b = -123;
    const _: Equal<a, b> = true;
  }
})();
