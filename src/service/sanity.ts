import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: false, // set to `false` to bypass the edge cache
  // Set default headers to be included with all requests
  headers: {
    'X-Custom-Header': 'custom-value',
  },
  apiVersion: '2025-12-02', // use current date (YYYY-MM-DD) to target the latest API version. Note: this should always be hard coded. Setting API version based on a dynamic value (e.g. new Date()) may break your application at a random point in the future.
  token: process.env.SANITY_SECRET_TOKEN, // Needed for certain operations like updating content, accessing drafts or using draft perspectives
});
