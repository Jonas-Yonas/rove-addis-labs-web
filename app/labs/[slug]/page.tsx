import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleLayout, StatusPill } from "@/components/public/article-layout";
import { Prose } from "@/components/public/prose";
import { getExperimentBySlug } from "@/lib/public/queries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const experiment = await getExperimentBySlug(slug);

  if (!experiment) return { title: "Experiment not found" };

  const description = experiment.summary ?? undefined;

  return {
    title: experiment.title,
    description,
    openGraph: { title: experiment.title, description },
    twitter: { title: experiment.title, description },
  };
}

export default async function LabPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const experiment = await getExperimentBySlug(slug);

  if (!experiment) notFound();

  return (
    <ArticleLayout
      backHref="/labs"
      backLabel="All labs"
      section="Labs"
      meta={<StatusPill>{experiment.status}</StatusPill>}
      aside={<p>Status: {experiment.status.toLowerCase()}</p>}
      title={experiment.title}
      lead={experiment.summary}
      coverUrl={experiment.cover_image_url}
    >
      {experiment.content ? (
        <Prose text={experiment.content} />
      ) : (
        <p className="text-muted-foreground">More on this experiment soon.</p>
      )}
    </ArticleLayout>
  );
}
