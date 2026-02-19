import { createClient, type SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

/**
 * Sanity CMS Client Configuration
 *
 * Environment variables required:
 * - NEXT_PUBLIC_SANITY_PROJECT_ID
 * - NEXT_PUBLIC_SANITY_DATASET
 * - SANITY_API_READ_TOKEN (optional, for private datasets)
 */

// Check if Sanity is configured
export const isSanityConfigured = (): boolean => {
  return !!(
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    process.env.NEXT_PUBLIC_SANITY_DATASET
  );
};

// Lazy client initialization
let _client: SanityClient | null = null;

/**
 * Get or create Sanity client
 * Only creates the client if environment variables are configured
 */
export function getSanityClient(): SanityClient {
  if (!isSanityConfigured()) {
    throw new Error(
      "Sanity client is not configured. Please set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET environment variables.",
    );
  }

  if (!_client) {
    _client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      apiVersion: "2024-01-01", // Use current date in YYYY-MM-DD format
      useCdn: false, // Disable CDN so updates are reflected quickly
      token: process.env.SANITY_API_READ_TOKEN, // Optional, only needed for private datasets
    });
  }

  return _client;
}

// Export client getter (not the client instance)
export const sanityClient = {
  fetch: async <T = any>(
    query: string,
    params?: Record<string, any>,
  ): Promise<T> => {
    const client = getSanityClient();
    if (params) {
      return client.fetch<T>(query, params);
    }
    return client.fetch<T>(query);
  },
};

// Image URL builder - lazy initialization
let _builder: ReturnType<typeof imageUrlBuilder> | null = null;

function getImageBuilder() {
  if (!_builder) {
    _builder = imageUrlBuilder(getSanityClient());
  }
  return _builder;
}

/**
 * Generate image URL from Sanity image reference
 * @param source - Sanity image source
 * @returns Image URL string
 */
export function urlFor(source: SanityImageSource): string {
  if (!source || !isSanityConfigured()) return "";
  try {
    return getImageBuilder().image(source).url();
  } catch {
    return "";
  }
}

/**
 * Generate optimized image URL with width
 * @param source - Sanity image source
 * @param width - Desired width
 * @returns Image URL string
 */
export function urlForWidth(source: SanityImageSource, width: number): string {
  if (!source || !isSanityConfigured()) return "";
  try {
    return getImageBuilder().image(source).width(width).url();
  } catch {
    return "";
  }
}
