import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/live";
import LoadMorePosts from "../components/LoadMorePosts"; // Import client component

const MDPOST_QUERY = defineQuery(`*[
  _type == "mdpost"
  && defined(slug.current)
]{_id, name, slug, date, createdBy, postType} | order(date desc)`);

export default async function IndexPage() {
    const { data: mdposts } = await sanityFetch({ query: MDPOST_QUERY });

    return (
        <main className="flex bg-gray-100 min-h-screen flex-col p-24 gap-12">
            <div className="flex flex-col gap-4 justify-center items-center">
                <h1 className="text-4xl font-bold tracking-tighter">Wiki @ Multidots</h1>
                <p className="text-gray-500">Library of projects and technical learnings.</p>
            </div>

            {/* Pass initial posts to client component */}
            <LoadMorePosts initialPosts={mdposts} />
        </main>
    );
}