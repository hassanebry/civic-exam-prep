"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import type { UserProfile } from "@/types";

interface UseProfileReturn {
  profile: UserProfile | null;
  isLoading: boolean;
  isPremium: boolean;
}

export function useProfile(): UseProfileReturn {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    setIsLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setProfile(null);
      setIsLoading(false);
      return;
    }

    const { data } = await supabase
      .from("profiles")
      .select("id, is_premium, stripe_customer_id, purchased_at")
      .eq("id", user.id)
      .single();

    setProfile(data as UserProfile | null);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return {
    profile,
    isLoading,
    isPremium: profile?.is_premium ?? false,
  };
}
