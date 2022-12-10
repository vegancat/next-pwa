import type { serverSideTranslations } from "next-i18next/serverSideTranslations";

type ServerSideTranslations = Awaited<
  ReturnType<typeof serverSideTranslations>
>;

export type { ServerSideTranslations };
