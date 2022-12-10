import Head from "next/head";
import Link from "next/link";

export default function About() {
  return (
    <>
      <Head>
        <title>next-pwa example</title>
      </Head>
      <h1>About</h1>
      <Link href="/">Home</Link>
    </>
  );
}
