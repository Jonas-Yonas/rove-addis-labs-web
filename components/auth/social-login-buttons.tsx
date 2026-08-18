"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export function SocialLoginButtons() {
  const [loadingProvider, setLoadingProvider] = useState<
    "google" | "github" | null
  >(null);

  async function signInWithProvider(provider: "google" | "github") {
    setLoadingProvider(provider);

    const supabase = createClient();

    const redirectTo = `${window.location.origin}/auth/callback`;

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo,
      },
    });

    if (error) {
      console.error("OAuth sign-in error:", error);
      setLoadingProvider(null);
      return;
    }

    if (data.url) {
      window.location.assign(data.url);
    }
  }

  const loading = loadingProvider !== null;

  return (
    <div className="grid gap-3">
      <Button
        type="button"
        variant="outline"
        className="h-11 w-full"
        disabled={loading}
        onClick={() => signInWithProvider("google")}
      >
        {loadingProvider === "google" ? (
          <Loader2 className="mr-2 size-4 animate-spin" />
        ) : (
          <GoogleIcon />
        )}
        Continue with Google
      </Button>

      <Button
        type="button"
        variant="outline"
        className="h-11 w-full"
        disabled={loading}
        onClick={() => signInWithProvider("github")}
      >
        {loadingProvider === "github" ? (
          <Loader2 className="mr-2 size-4 animate-spin" />
        ) : (
          <GithubIcon />
        )}
        Continue with GitHub
      </Button>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="mr-2 size-4" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M21.35 12.27c0-.79-.07-1.55-.2-2.27H12v4.3h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.42Z"
      />
      <path
        fill="currentColor"
        d="M12 21.99c2.63 0 4.84-.87 6.45-2.35l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.29v2.53A9.74 9.74 0 0 0 12 21.99Z"
      />
      <path
        fill="currentColor"
        d="M6.54 14.08A5.84 5.84 0 0 1 6.23 12c0-.72.12-1.42.31-2.08V7.39H3.29A9.99 9.99 0 0 0 2 12c0 1.61.39 3.13 1.29 4.61l3.25-2.53Z"
      />
      <path
        fill="currentColor"
        d="M12 5.88c1.43 0 2.72.49 3.73 1.45l2.8-2.8C16.84 2.87 14.63 2 12 2a9.74 9.74 0 0 0-8.71 5.39l3.25 2.53C7.31 7.6 9.46 5.88 12 5.88Z"
      />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg
      className="mr-2 size-4"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483
        0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463
        -.908-.62.069-.608.069-.608 1.003.071 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832
        .092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951
        0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65
        0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337
        1.909-1.296 2.748-1.026 2.748-1.026.546 1.378.202 2.397.1 2.65
        .64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943
        .359.31.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747
        0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.523 2 12 2Z"
      />
    </svg>
  );
}
