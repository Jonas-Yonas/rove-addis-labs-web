import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, FlaskConical } from "lucide-react";

import { PublicHero } from "@/components/public/public-hero";
import { SectionCta } from "@/components/public/section-cta";
import { getActiveExperiments } from "@/lib/public/queries";

export const metadata: Metadata = {
  title: "Labs",
  description: "Experiments and prototypes from Rove Addis Labs.",
};

export default async function LabsPage() {
  const experiments = await getActiveExperiments();

  return (
    <>
      <PublicHero
        eyebrow="Labs"
        title="Ideas we're actively exploring."
        description="Prototypes, research, and experiments — some become products, some teach us something, all of them move us forward."
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        {experiments.length === 0 ? (
          <div className="flex flex-col items-center rounded-2xl border border-dashed py-20 text-center">
            <span className="flex size-11 items-center justify-center rounded-xl bg-muted text-muted-foreground">
              <FlaskConical className="size-5" />
            </span>
            <p className="mt-4 font-medium">Nothing in the lab right now</p>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              New experiments will show up here.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {experiments.map((experiment) => (
              <Link
                key={experiment.id}
                href={`/labs/${experiment.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-200 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5"
              >
                <div className="relative aspect-16/10 overflow-hidden bg-muted">
                  {experiment.cover_image_url ? (
                    <Image
                      src={experiment.cover_image_url}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      unoptimized
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(40,181,177,0.16),transparent_62%)]" />
                  )}
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <span className="text-[11px] font-semibold tracking-[0.14em] text-accent uppercase">
                    {experiment.status}
                  </span>
                  <h2 className="mt-2 text-lg font-semibold leading-snug tracking-tight transition-colors group-hover:text-accent">
                    {experiment.title}
                  </h2>
                  {experiment.summary && (
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">
                      {experiment.summary}
                    </p>
                  )}
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                    Read more
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        <SectionCta
          title="Want to explore something with us?"
          description="If one of these sparks an idea, we're all ears."
          cta="Get in touch"
        />
      </div>
    </>
  );
}
