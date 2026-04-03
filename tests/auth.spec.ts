import { test, expect, type Page } from "@playwright/test";

const TEST_EMAIL = "test@civic-exam.dev";
const TEST_PASSWORD = "testpassword123";

/**
 * Helper: sign in by calling the test-only API route which uses the SSR
 * cookie helpers to set the Supabase session cookies server-side.
 * The middleware can then read these cookies on subsequent requests.
 */
async function signInViaSupabase(page: Page): Promise<void> {
  // Navigate first so the browser has cookies scoped to the app origin
  await page.goto("/");
  await page.waitForLoadState("domcontentloaded");

  const response = await page.request.post("/api/test-auth", {
    data: { email: TEST_EMAIL, password: TEST_PASSWORD },
  });

  if (!response.ok()) {
    const body = await response.text();
    throw new Error(`Test auth failed (${response.status()}): ${body}`);
  }

  // The API route set session cookies on the response.
  // Transfer them to the browser context so page navigations include them.
  const allHeaders = response.headersArray();
  const setCookieHeaders = allHeaders
    .filter((h) => h.name.toLowerCase() === "set-cookie")
    .map((h) => h.value);
  const cookiesToAdd: Parameters<typeof page.context.prototype.addCookies>[0] =
    [];

  for (const raw of setCookieHeaders) {
    const parsed = parseCookie(raw);
    if (parsed) cookiesToAdd.push(parsed);
  }

  if (cookiesToAdd.length > 0) {
    await page.context().addCookies(cookiesToAdd);
  }
}

/** Parse a Set-Cookie header string into a Playwright cookie object. */
function parseCookie(raw: string): {
  name: string;
  value: string;
  domain: string;
  path: string;
  httpOnly: boolean;
  secure: boolean;
  sameSite: "Strict" | "Lax" | "None";
} | null {
  const parts = raw.split(";").map((p) => p.trim());
  const [first, ...rest] = parts;
  if (!first) return null;

  const eqIndex = first.indexOf("=");
  if (eqIndex === -1) return null;

  const name = first.slice(0, eqIndex);
  const value = first.slice(eqIndex + 1);

  let path = "/";
  let httpOnly = false;
  let secure = false;
  let sameSite: "Strict" | "Lax" | "None" = "Lax";

  for (const attr of rest) {
    const lower = attr.toLowerCase();
    if (lower.startsWith("path=")) {
      path = attr.split("=")[1] ?? "/";
    } else if (lower === "httponly") {
      httpOnly = true;
    } else if (lower === "secure") {
      secure = false; // localhost is not https
    } else if (lower.startsWith("samesite=")) {
      const val = attr.split("=")[1]?.toLowerCase();
      if (val === "strict") sameSite = "Strict";
      else if (val === "none") sameSite = "None";
      else sameSite = "Lax";
    }
  }

  return {
    name,
    value,
    domain: "localhost",
    path,
    httpOnly,
    secure: false,
    sameSite,
  };
}

// ---------------------------------------------------------------------------
// Unauthenticated redirects
// ---------------------------------------------------------------------------

test.describe("middleware - unauthenticated redirects", () => {
  test("redirects from /dashboard to /login", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/login/);
  });

  test("redirects from /exam to /login", async ({ page }) => {
    await page.goto("/exam");
    await expect(page).toHaveURL(/\/login/);
  });

  test("redirects from /review to /login", async ({ page }) => {
    await page.goto("/review");
    await expect(page).toHaveURL(/\/login/);
  });
});

// ---------------------------------------------------------------------------
// Authenticated redirects
// ---------------------------------------------------------------------------

test.describe("middleware - authenticated redirects", () => {
  test("redirects from /login to /dashboard", async ({ page }) => {
    await signInViaSupabase(page);
    await page.goto("/login");
    await expect(page).toHaveURL(/\/dashboard/);
  });

  test("redirects from /register to /dashboard", async ({ page }) => {
    await signInViaSupabase(page);
    await page.goto("/register");
    await expect(page).toHaveURL(/\/dashboard/);
  });
});

// ---------------------------------------------------------------------------
// Logout
// ---------------------------------------------------------------------------

test.describe("logout", () => {
  test("signs out and redirects to /", async ({ page }) => {
    await signInViaSupabase(page);

    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/dashboard/);

    // Click the sign-out button in the header
    await page.getByRole("button", { name: "Déconnexion" }).click();

    await expect(page).toHaveURL("/");

    // Header should now show the "Connexion" link instead
    await expect(page.getByRole("link", { name: "Connexion" })).toBeVisible();
  });
});
