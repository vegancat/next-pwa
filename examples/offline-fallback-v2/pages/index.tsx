import Head from "next/head";
import Image from "next/image";

export default function Index() {
  return (
    <>
      <Head>
        <title>next-pwa example</title>
      </Head>
      <h1>Next.js + PWA = AWESOME!</h1>
      <h2>Routes that are not cached will fallback to /_offline</h2>
      <h2>This image will fallback to placeholder when offline</h2>
      <Image
        src="https://source.unsplash.com/600x400/?cat"
        alt="random cat"
        width={600}
        height={400}
      />
    </>
  );
}
