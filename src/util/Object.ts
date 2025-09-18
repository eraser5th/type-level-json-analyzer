export namespace Object {
  export type Merge<a extends object, b extends object> =
    a & b extends infer O ? { [k in keyof O]: O[k] } : never;

}
