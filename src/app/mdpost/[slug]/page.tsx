import { sanityFetch, } from "@/sanity/live";
import { defineQuery } from "next-sanity";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { urlFor } from "@/sanity/client";
import { PortableText, PortableTextComponentProps } from '@portabletext/react';
import { TextAlign } from "../../components/TextAlignComponent";


const MDPOST_QUERY = defineQuery(`*[
    _type == "mdpost" &&
    slug.current == $slug
  ][0]{
  ...,
  "date": coalesce(date, now()),
    "createdBy": coalesce(createdBy, "Anonymous"),
    "postType": coalesce(postType, "blog"),
    "mainImage": mainImage,
    "categories": categories[]->title,
    "description": description,
    
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
        description,
    }: {
        name?: string;
        date?: string;
        createdBy?: string;
        postType?: string | string[];
        mainImage?: { asset?: { _ref: string }; url?: string; alt?: string; width?: number; height?: number };
        content?: [];
        categories?: string | string[];
        description?: string;

    } = post;
    const components = {
        types: {
            image: ({ value }: { value: { asset: { _ref: string }; alt?: string; width?: number; height?: number } }) => (
                <Image
                    src={value.asset?._ref ? urlFor({ asset: { _ref: value.asset._ref, _type: "reference" } }).url() : ''}
                    alt={value.alt || 'Post Image'}
                    width={value.width || 800}
                    height={value.height || 600}
                />
            )
        },
        list: {
            bullet: ({ children }: PortableTextComponentProps<unknown>) => <ul style={{ paddingLeft: '20px', listStyle: 'disc' }}>{children}</ul>,
            number: ({ children }: PortableTextComponentProps<unknown>) => <ol style={{ paddingLeft: '20px', listStyle: 'decimal' }}>{children}</ol>,
        },
        block: {
            // get alignment mark from the block
            normal: ({ children }: PortableTextComponentProps<unknown>) => <p style={{ margin: '10px 0' }}>{children}</p>,
            h1: ({ children }: PortableTextComponentProps<unknown>) => <h1 style={{ fontSize: '32px', fontWeight: 'bold', margin: '10px 0' }}>{children}</h1>,
            h2: ({ children }: PortableTextComponentProps<unknown>) => <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: '10px 0' }}>{children}</h2>,
            h3: ({ children }: PortableTextComponentProps<unknown>) => <h3 style={{ fontSize: '20px', fontWeight: 'bold', margin: '10px 0' }}>{children}</h3>,
        },
        marks: {

            left: ({ children }: PortableTextComponentProps<unknown>) => <TextAlign value="left">{children}</TextAlign>,
            center: ({ children }: PortableTextComponentProps<unknown>) => <TextAlign value="center">{children}</TextAlign>,
            right: ({ children }: PortableTextComponentProps<unknown>) => <TextAlign value="right">{children}</TextAlign>,

            textColor: ({ children, value }: { children: React.ReactNode; value: { color?: string } }) => {
                return <span style={{ color: value?.color || "inherit" }}>{children}</span>;
            },
            backgroundColor: ({ children, value }: { children: React.ReactNode; value: { bgcolor?: string } }) => {
                return (
                    <span
                        style={{
                            backgroundColor: value?.bgcolor ? value.bgcolor : "transparent",
                            padding: "2px 4px",
                            display: "inline-block",
                        }}
                    >
                        {children}
                    </span>
                );
            },

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
                            <Image
                                src={mainImage?.asset?._ref ? urlFor({ asset: { _ref: mainImage.asset._ref, _type: "reference" } }).url() || '' : mainImage?.url || ''}
                                alt={mainImage.alt || 'Post Image'}
                                width={mainImage.width || 800}
                                height={mainImage.height || 600}
                                priority
                            />
                        )}
                        {Array.isArray(content) ? (
                            <PortableText value={content || []} components={components} />
                        ) : null}

                        {Array.isArray(description) ? (
                            <PortableText value={description} components={components} />
                        ) : null}

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