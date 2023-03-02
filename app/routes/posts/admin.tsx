import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";

import { getPosts } from "~/models/post.server";

export const loader = async () => {
  return json({ posts: await getPosts() });
};

export default function PostAdmin() {
  const { posts } = useLoaderData<typeof loader>();
  return (
    <div className="mx-auto max-w-4xl">
      <div className="relative">
        <Link to="/posts" className="absolute text-blue-600 underline">
          Back to Posts
        </Link>
        <h1 className="my-6 mb-2 border-b-2 text-center text-3xl">
          Blog Admin
        </h1>
      </div>
      <div className="grid grid-cols-4 gap-6">
        <nav className="col-span-4 md:col-span-1">
          <ul className="flex flex-col gap-3">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link to={post.slug} className="text-blue-600 underline">
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <main className="col-span-4 md:col-span-3">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
