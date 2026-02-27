"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function ClientPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;

      if (!token) {
        setData({ user: null, note: "Sem sessão no client" });
        return;
      }

      const res = await fetch("/api/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setData(await res.json());
    })();
  }, []);

  return (
    <main style={{ padding: 24 }}>
      <h1>Área do Cliente</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}