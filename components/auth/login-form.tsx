import Link from "next/link";

import { SocialLoginButtons } from "@/components/auth/social-login-buttons";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { brand } from "@/config/brand";
import Image from "next/image";

export function LoginForm() {
  return (
    <Card className="border-border/70 shadow-sm">
      <CardHeader className="space-y-4 text-center">
        <div className="mx-auto flex size-14 items-center justify-center">
          <Image
            src="/brand/logo-mark.svg"
            alt="Rove Addis Labs"
            width={56}
            height={56}
            priority
          />
        </div>

        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to your {brand.name} account.
          </p>
        </div>
      </CardHeader>

      <CardContent>
        <SocialLoginButtons />

        <div className="mt-6 text-center text-xs text-muted-foreground">
          By continuing, you agree to our{" "}
          <Link
            href="/terms"
            className="underline underline-offset-4 hover:text-foreground"
          >
            terms
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-foreground"
          >
            privacy policy
          </Link>
          .
        </div>
      </CardContent>
    </Card>
  );
}
