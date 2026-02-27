import { createClient } from "@supabase/supabase-js";

export async function GET(req: Request) {
  const auth = req.headers.get("authorization") ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;

  if (!token) {
    return Response.json({ user: null, reason: "missing_token" }, { status: 200 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    return Response.json(
      { user: null, reason: "invalid_token", error: error?.message ?? null },
      { status: 200 }
    );
  }

  return Response.json({
    user: {
      id: data.user.id,
      email: data.user.email,
      name: data.user.user_metadata?.full_name ?? null,
      avatar: data.user.user_metadata?.avatar_url ?? data.user.user_metadata?.picture ?? null,
      telefone: data.user.user_metadata?.phone ?? null,
    },
  });
}