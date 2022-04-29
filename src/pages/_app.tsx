import { withTRPC } from "@trpc/next";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { AppRouter } from "./api/trpc/[trpc]";
import superjson from "superjson";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default withTRPC<AppRouter>({
  config() {
    console.log(process.env.VERCEL_URL);

    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : "http://localhost:3000/api/trpc";

    return { url, transformer: superjson };
  },
})(MyApp);
