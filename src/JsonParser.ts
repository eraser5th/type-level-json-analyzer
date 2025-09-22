import { Parser } from "./Parser/Parser";
import { SimpleToken } from "./Token";
import { Tokenizer } from "./Tokenizer";
import { ArrayRemoveElement } from "./util/Array";

export type JsonParser<S extends string = ""> =
  Parser<ArrayRemoveElement<Tokenizer<S>, SimpleToken.WhiteSpace>> extends [
    infer Result,
    ...infer _,
  ]
    ? Result
    : unknown;
