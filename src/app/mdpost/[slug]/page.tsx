import { sanityFetch , } from "@/sanity/live";
import { defineQuery } from "next-sanity";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { urlFor } from "@/sanity/client";
import { PortableText } from '@portabletext/react';


const MDPOST_QUERY = defineQuery(`*[
    _type == "mdpost" &&
    slug.current == $slug
  ][0]{
  ...,
  "date": coalesce(date, now()),
    "createdBy": coalesce(createdBy, "Anonymous"),
    "postType": coalesce(postType, "blog"),
    "mainImage": mainImage.asset->url,
    "categories": categories[]->title,
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
        mainImage,
        content,
        categories,
    } = post;
    const components = {
        types: {
            image: ({ value }: { value: { asset: { _ref: string }; alt?: string } }) => (
                    <Image
                        src={urlFor(value.asset._ref).width(800).url() || ''}
                        alt={value.alt || 'Image'}
                        width={800}
                        height={500}
                        style={{ borderRadius: '10px' }}
                        priority
                    />
            )
        },
        list: {
            bullet: ({ children }) => <ul style={{ paddingLeft: '20px', listStyle: 'disc' }}>{children}</ul>,
            number: ({ children }) => <ol style={{ paddingLeft: '20px', listStyle: 'decimal' }}>{children}</ol>,
        },
        block: {
            normal: ({ children }) => <p style={{ fontSize: '18px', lineHeight: '1.6' }}>{children}</p>,
            h2: ({ children }) => <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: '10px 0' }}>{children}</h2>,
            h3: ({ children }) => <h3 style={{ fontSize: '20px', fontWeight: 'bold', margin: '10px 0' }}>{children}</h3>,
        },
    };

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
                        {mainImage && (
                            <img
                                src={urlFor(mainImage).width(800).url() || ''}
                                alt={mainImage.alt || 'Post Image'}
                            />
                        )}
                        <PortableText value={content} components={components} />

                        {Array.isArray(categories) ? (
                            <p className="text-gray-500">
                                {categories.join(", ")}
                            </p>
                        ) : categories ? (
                            <p className="text-gray-500">
                                {categories}
                            </p>
                        ) : null}   
                        

                       
                    </div>
                </div>
            </div>
        </main>
    );
}