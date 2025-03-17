/**
 * Extracts the variants and their values
 */
export type ExtractVariantProps<T> = T extends (props: infer P) => any
  ? {
      [K in keyof P]?: P[K] extends 'true' | 'false' ? boolean : P[K];
    }
  : never;

export type IsBooleanVariant<T> = keyof T extends 'true' | 'false'
  ? boolean
  : keyof T;

export type ClassName = string | string[] | undefined;
