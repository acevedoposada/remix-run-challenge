import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { withZod } from "@remix-validated-form/with-zod";
import { ValidatedForm } from "remix-validated-form";
import { useActionData, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { json } from "@remix-run/node";
import { z } from "zod";
import { getPost, updatePost } from "~/models/post.server";
import TextField from "~/components/TextField";
import SubmitButton from "~/components/SubmitButton";

export const loader = async ({ params }: LoaderArgs) => {
  invariant(params.slug, "Slug is required");

  const post = await getPost(params.slug);

  return json({ post });
};

export const action = async ({ request }: ActionArgs) => {
  const data = await request.formData();

  const title = data.get("title");
  const slug = data.get("slug");
  const markdown = data.get("markdown");

  invariant(typeof title === "string", "title must be a string");
  invariant(typeof slug === "string", "slug must be a string");
  invariant(typeof markdown === "string", "markdown must be a string");

  await updatePost({
    slug,
    title,
    markdown,
  });

  return redirect(`/posts/${slug}`);
};

export const validator = withZod(
  z.object({
    title: z.string().min(1, "Title is required"),
    slug: z.string().min(1, "Slug is required"),
    markdown: z.string().min(1, "Markdown is required"),
  })
);

export default function PostAdminSlug() {
  useActionData<typeof action>();
  const { post } = useLoaderData<typeof loader>();

  return (
    <ValidatedForm
      key={post?.slug}
      method="post"
      validator={validator}
      resetAfterSubmit
      className="flex flex-col gap-4"
      defaultValues={{
        ...post,
      }}
    >
      <p>
        <TextField name="title" label="Post Title:" />
      </p>
      <p>
        <TextField label="Post Slug:" name="slug" />
      </p>
      <p>
        <label htmlFor="markdown">Markdown:</label>
        <br />
        <TextField name="markdown" multiline className="font-mono" />
      </p>
      <p className="text-right">
        <SubmitButton />
      </p>
    </ValidatedForm>
  );
}
