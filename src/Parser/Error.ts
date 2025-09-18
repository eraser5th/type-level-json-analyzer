import { SimpleToken, Token } from "../Token"

export enum SimpleError {
  InvalidObjectField = 'InvalidObjectField',
  InvalidArrayElement = 'InvalidArrayElement',
  InvalidValue = 'InvalidValue',
  UnexpectedEndOfInput = 'UnexpectedEndOfInput',

  UnImplemented = 'UnImplemented',
}

export type UnexpectedToken<T extends Token = SimpleToken.Bad> = {
  type: "UnexpectedToken",
  token: T,
}

export type ParseError = SimpleError | UnexpectedToken
