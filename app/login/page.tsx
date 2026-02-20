"use client";

import { supabase } from "../../lib/supabaseClient";

export default function LoginPage() {
  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) alert(error.message);
  };

  return (
    <main style={{ padding: 24 }}>
      <h1>Login</h1>
      <button onClick={signInWithGoogle}>Entrar com Google</button>
    </main>
  );
}