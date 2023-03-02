import type { LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { json } from "@remix-run/node";
import { marked } from "marked";

import { getPost } from "~/models/post.server";

export const loader = async ({ params }: LoaderArgs) => {
  invariant(params.slug, "params.slug is required");

  const post = await getPost(params.slug);
  invariant(post, `Post not found: ${params.slug}`);

  const html = marked(post.markdown);

  return json({ post, html });
};

export default function PostSlug() {
  const { post, html } = useLoaderData<typeof loader>();

  return (
    <main className="mx-auto mt-3 max-w-4xl">
      <div className="relative border-b-2 py-2">
        <Link
          to="/posts"
          className="absolute left-0 top-1/2 -translate-y-1/2 px-3 text-blue-600"
        >
          Back
        </Link>
        <h1 className="my-4 text-center text-3xl">{post?.title}</h1>
      </div>
      <div className="py-6" dangerouslySetInnerHTML={{ __html: html }} />
      <div>{/* Comments section here! */}</div>
    </main>
  );
}
