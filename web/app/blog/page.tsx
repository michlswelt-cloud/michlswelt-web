import Link from 'next/link';
import { sanityClient } from '@/lib/sanity/client';
import { allPostsQuery } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';
import type { Post } from '@/lib/sanity/types';

export const metadata = { title: 'Blog' };

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export default async function BlogIndexPage() {
  const posts = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    ? await sanityClient.fetch<Post[]>(allPostsQuery)
    : [];

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="font-heading text-3xl font-bold text-brand-primary">Blog</h1>
      {!posts.length ? (
        <p className="mt-6 text-brand-secondary">Es sind noch keine Beitraege veroeffentlicht.</p>
      ) : (
        <div className="mt-8 space-y-10">
          {posts.map((post) => (
            <article key={post._id} className="flex gap-6">
              {post.coverImage ? (
                <Link href={`/blog/${post.slug.current}`} className="shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={urlFor(post.coverImage).width(200).height(150).fit('crop').auto('format').url()}
                    alt=""
                    className="h-32 w-44 rounded-brand object-cover"
                  />
                </Link>
              ) : null}
              <div>
                <p className="text-sm text-brand-secondary">{formatDate(post.publishedAt)}</p>
                <h2 className="mt-1 font-heading text-xl font-semibold text-brand-primary">
                  <Link href={`/blog/${post.slug.current}`}>{post.title}</Link>
                </h2>
                {post.excerpt ? <p className="mt-2 text-brand-text">{post.excerpt}</p> : null}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
