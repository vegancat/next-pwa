import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <h1>Next.js + PWA = AWESOME!</h1>
      <Link href="/appdir/about">About page</Link>
    </>
  );
}
