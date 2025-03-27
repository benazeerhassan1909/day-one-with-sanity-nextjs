import { createClient } from 'next-sanity'

const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2021-10-21';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  stega: { studioUrl: '/studio' },
})
