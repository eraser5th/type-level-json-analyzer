import { JsonParser } from "./JsonParser";
import { Equal } from "./util/Equal";

(function () {
  {
    type input = '[1, "hoge", 3]';
    type result = JsonParser<input>;
    type expected = [1, "hoge", 3];

    const _: Equal<result, expected> = true;
  }

  {
    type input = `[
      1,
      true,
      false,
      null,
      "hoge"
    ]`;

    type result = JsonParser<input>;
    type expected = [1, true, false, null, "hoge"];

    const _: Equal<result, expected> = true;
    _;
  }
  {
    type input = "{}";
    type result = JsonParser<input>;
    type expected = {};

    const _: Equal<result, expected> = true;
    _;
  }
  {
    type input = '{ "key": 123 }';
    type result = JsonParser<input>;
    type expected = { key: 123 };

    const _: Equal<result, expected> = true;
    _;
  }
  {
    type input = `{
      "number": 123,
      "string": "hoge",
      "booleanTrue": true,
      "booleanFalse": false,
      "null": null
    }`;

    type result = JsonParser<input>;
    type expected = {
      number: 123;
      string: "hoge";
      booleanTrue: true;
      booleanFalse: false;
      null: null;
    };

    const _: Equal<result, expected> = true;
    _;
  }
})();
