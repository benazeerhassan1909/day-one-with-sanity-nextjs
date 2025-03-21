import { createClient } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url';


export const client = createClient({
    projectId: "oijhllhx",
    dataset: "production",
    apiVersion: "2024-11-01",
    useCdn: false,
    stega: {
        studioUrl: 'http://localhost:3333/studio/',
    },
});
const builder = imageUrlBuilder(client);

interface ImageSource {
    asset: {
        _ref: string;
        _type: string;
    };
}

export const urlFor = (source: ImageSource) => builder.image(source);