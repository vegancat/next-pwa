import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import nextjsDark from "../images/nextjs-dark.svg";

export default function Index() {
  return (
    <>
      <Head>
        <title>next-pwa example</title>
      </Head>
      <h1>Next.js + PWA = AWESOME!</h1>
      <Image src={nextjsDark} width={504} height={300} alt="Test image" />
      <Link href="/about">About</Link>
    </>
  );
}
