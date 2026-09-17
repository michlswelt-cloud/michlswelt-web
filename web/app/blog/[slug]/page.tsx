import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { sanityClient } from '@/lib/sanity/client';
import { allPostSlugsQuery, postBySlugQuery } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';
import type { Post } from '@/lib/sanity/types';
import { PLACEHOLDER_SLUG, toStaticParams } from '@/lib/sanity/staticParams';
import PortableText from '@/components/PortableText';

export async function generateStaticParams() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return toStaticParams([]);
  const slugs = await sanityClient.fetch<string[]>(allPostSlugsQuery);
  return toStaticParams(slugs);
}

async function getPost(slug: string) {
  // Platzhalter-Slug wird nur erzeugt, wenn es (noch) keine Beitraege gibt -
  // dafuer muss nicht erst das CMS gefragt werden, das Ergebnis ist immer "nicht gefunden".
  if (slug === PLACEHOLDER_SLUG || !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return null;
  return sanityClient.fetch<Post | null>(postBySlugQuery, { slug });
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);
  return {
    title: post?.seo?.metaTitle ?? post?.title,
    description: post?.seo?.metaDescription ?? post?.excerpt,
  };
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      {post.coverImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={urlFor(post.coverImage).width(1200).height(600).fit('crop').auto('format').url()}
          alt=""
          className="mb-8 w-full rounded-brand object-cover"
        />
      ) : null}
      <p className="text-sm text-brand-secondary">
        {formatDate(post.publishedAt)}
        {post.author?.name ? ` · ${post.author.name}` : ''}
      </p>
      <h1 className="mt-2 font-heading text-3xl font-bold text-brand-primary">{post.title}</h1>
      <div className="mt-8">
        <PortableText value={post.body ?? []} />
      </div>
      {post.tags?.length ? (
        <ul className="mt-8 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-brand bg-brand-accent/10 px-3 py-1 text-xs text-brand-accent"
            >
              {tag}
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
