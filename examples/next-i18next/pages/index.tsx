import type { GetStaticProps } from "next";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import type { ServerSideTranslations } from "../shared/types";

export default function Index() {
  const { t } = useTranslation("common");
  return (
    <>
      <Head>
        <title>next-pwa example</title>
      </Head>
      <h1>Next.js + PWA = {t("awesome").toLocaleUpperCase()}!</h1>
    </>
  );
}

type GSPProps = ServerSideTranslations;

export const getStaticProps: GetStaticProps<GSPProps> = async ({ locale }) => {
  return {
    props: {
      // replace "en" with your preferred default language.
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};
