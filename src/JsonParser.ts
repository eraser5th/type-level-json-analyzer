import { Parser } from "./Parser/Parser";
import { Tokenizer } from "./Tokenizer";

export type JsonParser<S extends string = ""> = Parser<Tokenizer<S>>
