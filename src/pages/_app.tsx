import { withTRPC } from "@trpc/next";
import { AppType } from "next/dist/shared/lib/utils";
import { loggerLink } from "@trpc/client/links/loggerLink";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import superjson from "superjson";

import "../styles/globals.css";
import { AppRouter } from "../server/routers/app";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

function getBaseURL() {
  // TODO: find alternative to validate process.browser
  // if (typeof window === "undefined") return ""; // * Browser should use current Path
  // if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // * If using vercel deployment

  return `http://localhost:${process.env.PORT ?? 3000}`; // * SSR for localhost
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = `${getBaseURL()}/api/trpc`;

    const links = [
      loggerLink(),
      httpBatchLink({
        maxBatchSize: 10,
        url,
      }),
    ];

    return {
      queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
      links,
      transformer: superjson,
    };
  },
  ssr: true,
  responseMeta({ clientErrors, ctx }) {
    if (clientErrors.length) {
      return {
        status: clientErrors[0].data?.httpStatus ?? 500,
      };
    }

    const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
    return {
      "Cache-Control": `s-maxage=1, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`,
    };
  },
})(MyApp);
