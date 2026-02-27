import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);

  const response = NextResponse.redirect(
    new URL("/client", request.url)
  );

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const code = url.searchParams.get("code");

  if (code) {
    const { error, data } = await supabase.auth.exchangeCodeForSession(code);
    console.log("Exchange session data:", data);
    console.log("Exchange session error:", error);
    if (error) {
      console.error("Erro ao trocar code por sessão:", error.message);
    }
  }

  return response;
}