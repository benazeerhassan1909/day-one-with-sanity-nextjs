"use client";

import { useState } from "react";
import Link from "next/link";

const POSTS_PER_PAGE = 3; // Number of posts per load

export default function LoadMorePosts({ initialPosts }) {
    const [searchQuery, setSearchQuery] = useState(""); // Search input state
    const [visiblePosts, setVisiblePosts] = useState(POSTS_PER_PAGE);

    // Filter posts based on search query
    const filteredPosts = initialPosts.filter((post) =>
        post.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Handle "Load More" functionality
    const handleLoadMore = () => {
        setVisiblePosts((prev) => prev + POSTS_PER_PAGE);
    };

    return (
        <>
            {/* Search Input */}
            <div className="flex justify-center mb-6">
                <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-4 py-2 w-full max-w-md border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            {/* Posts List */}
            <ul className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                {filteredPosts.slice(0, visiblePosts).map((mdpost) => (
                    <li className="p-4 rounded-lg hover:scale-110" key={mdpost._id}>
                        <div className="flex flex-col gap-4 bg-black p-4 rounded-t-lg">
                            <Link
                                className="hover:underline text-white flex flex-col gap-12"
                                href={`/events/${mdpost?.slug?.current}`}
                            >
                                <h2 className="text-xl font-semibold">{mdpost?.name}</h2>
                                {mdpost?.postType && Array.isArray(mdpost.postType) ? (
                                    <div className="flex flex-wrap gap-2">
                                        {mdpost.postType.map((type, index) => (
                                            <p key={index} className="text-white rounded-lg bg-gray-500 p-2 capitalize">
                                                {type.replace("-", " ")}
                                            </p>
                                        ))}
                                    </div>
                                ) : (
                                    mdpost?.postType && (
                                            <p className="text-white rounded-lg bg-gray-500 p-2 capitalize">
                                            {mdpost.postType.replace("-", " ")}
                                        </p>
                                    )
                                )}
                            </Link>
                        </div>
                        <div className="flex flex-row justify-between bg-gray-300 p-4 rounded-b-lg">
                            {mdpost?.createdBy && <p className="text-black">By {mdpost.createdBy}</p>}
                            {mdpost?.date && (
                                <p className="text-black">
                                    {new Date(mdpost.date).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "2-digit",
                                        year: "numeric",
                                    })}
                                </p>
                            )}
                        </div>
                    </li>
                ))}
            </ul>

            {/* "Load More" Button */}
            {visiblePosts < filteredPosts.length && (
                <div className="flex justify-center mt-8">
                    <button
                        onClick={handleLoadMore}
                        className="px-6 py-2 text-white bg-black rounded-lg hover:bg-blue-700 transition"
                    >
                         Load More
                    </button>
                </div>
            )}

            {/* No results message */}
            {filteredPosts.length === 0 && (
                <p className="text-center text-gray-500 mt-4">No matching posts found.</p>
            )}
        </>
    );
}
