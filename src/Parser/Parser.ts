import { Token } from "../Token";

export type Parser<T extends Token[]> = unknown;

`
{
  "hoge": {
    "fuga": 1234,
  }
}
`;

type json = {
  hoge: {
    fuga: number;
  };
};
