export type StringKeyOf<BaseType> = `${Extract<
  keyof BaseType,
  string | number
>}`;

export interface ManifestEntry {
  integrity?: string;
  revision: string | null;
  url: string;
}
