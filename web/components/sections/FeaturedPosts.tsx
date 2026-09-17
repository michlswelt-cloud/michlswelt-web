import Link from 'next/link';
import { urlFor } from '@/lib/sanity/image';
import type { FeaturedPostsBlock } from '@/lib/sanity/types';

export default function FeaturedPosts({ block }: { block: FeaturedPostsBlock }) {
  if (!block.posts?.length) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      {block.heading ? (
        <h2 className="mb-6 font-heading text-2xl font-bold text-brand-primary">{block.heading}</h2>
      ) : null}
      <div className="grid gap-6 md:grid-cols-3">
        {block.posts.map((post) => (
          <Link
            key={post._id}
            href={`/blog/${post.slug.current}`}
            className="group overflow-hidden rounded-brand border border-brand-secondary/10"
          >
            {post.coverImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={urlFor(post.coverImage).width(500).height(300).fit('crop').auto('format').url()}
                alt=""
                className="h-48 w-full object-cover transition duration-300 group-hover:scale-105"
              />
            ) : null}
            <div className="p-4">
              <h3 className="font-heading text-lg font-semibold text-brand-primary">{post.title}</h3>
              {post.excerpt ? (
                <p className="mt-2 line-clamp-2 text-sm text-brand-secondary">{post.excerpt}</p>
              ) : null}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
