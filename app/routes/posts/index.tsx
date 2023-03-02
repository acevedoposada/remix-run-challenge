import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getPosts } from "~/models/post.server";

export const loader = async () => {
  return json({
    posts: await getPosts(),
  });
};

export default function Post() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <main className="p-5">
      <div className="flex justify-between">
        <h1 className="text-4xl font-semibold">Posts</h1>
        <Link to="admin" className="text-red-600 underline">
          Admin
        </Link>
      </div>
      <div className="grid grid-cols-5 gap-4 py-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            to={post.slug}
            className="flex items-center justify-center rounded-md border border-blue-600 px-5 py-2 text-center text-lg text-blue-600 hover:bg-blue-50"
          >
            {post.title}
          </Link>
        ))}
      </div>
    </main>
  );
}
