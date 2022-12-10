export function util() {
  console.log("Hello from util.");
  console.log("es6+ syntax test:");
  // eslint-disable-next-line prefer-const
  let foo = { message: "working" };
  console.log(foo?.message);
}
