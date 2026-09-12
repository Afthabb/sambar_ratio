import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="site-wrap flex min-h-screen items-center justify-center p-4">
      <div className="app-glass max-w-lg text-center p-8 sm:p-12">
        <span className="eyebrow">Error 404</span>
        <h1 className="text-6xl font-extrabold text-foreground tracking-tight my-4">404</h1>
        <h2 className="text-xl font-bold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          The page or experiment you are looking for does not exist in this laboratory.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="pill-button inline-flex"
          >
            Return to Lab
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="site-wrap flex min-h-screen items-center justify-center p-4">
      <div className="app-glass max-w-lg text-center p-8 sm:p-12">
        <span className="eyebrow">Laboratory Anomaly</span>
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground my-4">
          This page didn't load
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Something went wrong during execution. You can refresh or return to the laboratory entrance.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="pill-button"
          >
            Try again
          </button>
          <a
            href="/"
            className="pill-button secondary-pill"
          >
            Return to Lab
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "CHOR Mixing Lab" },
      { name: "description", content: "Precision mixing for highly unnecessary applications." },
      { name: "author", content: "CHOR Mixing Lab" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@1,6..72,400;1,6..72,500&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,700&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
