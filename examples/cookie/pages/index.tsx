import { deleteCookie, getCookie } from "cookies-next";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Index({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const handleLogoutClick = () => {
    deleteCookie("user");
    router.push("/login");
  };
  const handleLoginClick = () => {
    router.push("/login");
  };

  return (
    <>
      <Head>
        <title>next-pwa example</title>
      </Head>
      <h1>Next.js + PWA = AWESOME!</h1>
      {user ? (
        <>
          <h2>User ID: {user}</h2>
          <button onClick={handleLogoutClick}>Click to logout</button>
        </>
      ) : (
        <button onClick={handleLoginClick}>Click to login</button>
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  user: string | undefined;
}> = async ({ req, res }) => {
  const user = getCookie("user", {
    req,
    res,
  }) as string | undefined;
  if (!user) {
    console.log("❌ User not logged in, redirecting to /login.");
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  } else {
    console.log(`✅ User (id=${user}) is already logged in, showing page /.`);
    return {
      props: {
        user,
      },
    };
  }
};
