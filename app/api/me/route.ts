import { createSupabaseServerClient } from "../../../lib/supabaseServer";

export async function GET() {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return Response.json({ user: null });
  }

  return Response.json({
    user: {
      id: data.user.id,
      email: data.user.email,
      name: data.user.user_metadata?.full_name ?? null,
    },
  });
}