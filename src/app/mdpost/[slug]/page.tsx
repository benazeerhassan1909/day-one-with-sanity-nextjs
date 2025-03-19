import { sanityFetch } from "@/sanity/live";
import { defineQuery } from "next-sanity";
import Link from "next/link";
import { notFound } from "next/navigation";

const MDPOST_QUERY = defineQuery(`*[
    _type == "mdpost" &&
    slug.current == $slug
  ][0]{
  ...,
  "date": coalesce(date, now()),
    "createdBy": coalesce(createdBy, "Anonymous"),
    "postType": coalesce(postType, "blog")

}`);

export default async function PostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { data: post } = await sanityFetch({
        query: MDPOST_QUERY,
        params: await params,
    });
    if (!post) {
        notFound();
    }
    const {
        name,
        date,
        createdBy,
        postType,
    } = post;
   

    return (
        <main className="container mx-auto grid gap-12 p-12">
            <div className="mb-4">
                <Link href="/mdpost">← Back to posts</Link>
            </div>
            <div className="grid items-top gap-12 sm:grid-cols-2">
                <div className="flex flex-col justify-center space-y-4">
                    <div className="space-y-4">
                    
                        {name ? (
                            <h1 className="text-4xl font-bold tracking-tighter mb-8">
                                {name}
                            </h1>
                        ) : null}

                        {date ? (
                            <p className="text-gray-500">
                                {new Date(date).toLocaleDateString()}
                            </p>
                        ) : null}

                        {createdBy ? (
                            <p className="text-gray-500">
                                By {createdBy}
                            </p>
                        ) : null}
                        {Array.isArray(postType) ? (
                            <p className="text-gray-500">
                                {postType.join(", ")}
                            </p>
                        ) : postType ? (
                            <p className="text-gray-500">
                                {postType}
                            </p>
                        ) : null}
                       
                    </div>
                </div>
            </div>
        </main>
    );
}