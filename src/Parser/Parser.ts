import type { Token } from "../Token";

import type { ParseArray } from "./ParseArray";
import type { ParseObject } from "./ParseObject";
import { ParsePrimitiveValue } from "./ParsePrimitiveValue";

export type Parser<T extends Token[]> =
  | ParseObject<T>
  | ParseArray<T>
  | ParsePrimitiveValue<T>;
