export type Booleanish = boolean | 'true' | 'false';
export const dataAttr = (attr: boolean | undefined) =>
  (attr ? 'true' : undefined) as Booleanish;
