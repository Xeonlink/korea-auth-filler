import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import ReactDom from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { browser } from "wxt/browser";
import { ErrorFallback } from "./ErrorFallback";
import { Loading } from "./Loading";
import "./main.css";
import { Options } from "./Options";

const rootElement = document.querySelector("#root");
if (rootElement === null) {
  throw new Error("Root element not found");
}
const reactRoot = ReactDom.createRoot(rootElement);

const queryClient = new QueryClient();

reactRoot.render(
  <QueryClientProvider client={queryClient}>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<Loading />}>
        <Options />
      </Suspense>
    </ErrorBoundary>
  </QueryClientProvider>,
);

const titleElement = document.querySelector("title");
if (titleElement !== null) {
  titleElement.textContent = browser.i18n.getMessage("extension_name");
}
