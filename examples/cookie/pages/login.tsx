import { setCookie } from "cookies-next";
import Head from "next/head";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    setCookie("user", "FakeUserID-0527VND927SDF", {
      maxAge: 30 * 24 * 60 * 60,
    });
    router.replace("/");
  };

  return (
    <>
      <Head>
        <title>Login | next-pwa example</title>
      </Head>
      <h1>Login page</h1>
      <button onClick={handleLoginClick}>Click to login</button>
    </>
  );
};

export default Login;
