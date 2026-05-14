"use client";

import { useEffect } from "react";
import { storeReferrer } from "@/lib/utils/referrer";

export function RefCapture() {
  useEffect(() => {
    const ref = new URLSearchParams(window.location.search).get("ref");
    if (ref) {
      storeReferrer(ref);
    }
  }, []);

  return null;
}
