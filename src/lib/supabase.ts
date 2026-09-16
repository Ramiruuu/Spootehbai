import { createClient } from "@supabase/supabase-js";

import { auth } from "./firebase";

export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
  {
    accessToken: async () => (await auth.currentUser?.getIdToken()) ?? null,
  },
);
