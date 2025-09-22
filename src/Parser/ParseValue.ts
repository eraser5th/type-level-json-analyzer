import type { Token } from "../Token";

import type { SimpleError } from "./Error";
import type { ParsePrimitiveValue } from "./ParsePrimitiveValue";
import type { ParseObject } from "./ParseObject";
import type { ParseArray } from "./ParseArray";

export type ParseValue<Tokens extends Token[]> =
  | ParsePrimitiveValue<Tokens>
  | ParseObject<Tokens>
  | ParseArray<Tokens>
  | [SimpleError.InvalidValue, Tokens];
