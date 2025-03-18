import { createClient } from "next-sanity";

export const client = createClient({
    projectId: "oijhllhx",
    dataset: "production",
    apiVersion: "2024-11-01",
    useCdn: false,
});