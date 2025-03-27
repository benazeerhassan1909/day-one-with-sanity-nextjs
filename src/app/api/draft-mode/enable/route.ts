// src/app/api/draft-mode/enable/route.ts

import { client } from "@/sanity/client";
import { defineEnableDraftMode } from "next-sanity/draft-mode";

export const { GET } = defineEnableDraftMode({
    client: client.withConfig({
        useCdn: false,
        stega: true,
        perspective: "previewDrafts",
        
    }),
});