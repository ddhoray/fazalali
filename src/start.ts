import { createStart, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";
import { attachSupabaseAuth } from "@/integrations/supabase/auth-attacher";

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

// Hosts without the private backend key (e.g. Vercel) forward server-function
// calls to the Lovable-hosted deployment, which has it.
const BACKEND_ORIGIN = "https://omeros-cipher-glass.lovable.app";
const backendProxyMiddleware = createMiddleware().server(async ({ next, request }) => {
  const url = new URL(request.url);
  if (process.env["SUPABASE_SERVICE_ROLE_KEY"] || !url.pathname.startsWith("/_serverFn") || url.origin === BACKEND_ORIGIN) {
    return next();
  }
  const headers = new Headers(request.headers);
  headers.delete("host");
  headers.delete("content-length");
  const hasBody = request.method !== "GET" && request.method !== "HEAD";
  const res = await fetch(BACKEND_ORIGIN + url.pathname + url.search, {
    method: request.method,
    headers,
    body: hasBody ? await request.arrayBuffer() : undefined,
    redirect: "manual",
  });
  const out = new Headers(res.headers);
  out.delete("content-encoding");
  out.delete("content-length");
  return new Response(res.body, { status: res.status, headers: out }) as never;
});

export const startInstance = createStart(() => ({
  functionMiddleware: [attachSupabaseAuth],
  requestMiddleware: [backendProxyMiddleware, errorMiddleware],
}));
