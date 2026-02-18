import type { Property } from "./types";

/**
 * Sanity Document Types
 * These match the structure returned from Sanity queries
 */
export interface SanityProperty {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  slug: string;
  title: string;
  description: string;
  type: string;
  status: string;
  price: string;
  location: string;
  area: string;
  bedrooms: number;
  bathrooms: number;
  features: string[];
  images?: string[];
}

/**
 * Map Sanity property document to app Property type
 * @param doc - Sanity property document
 * @returns Property object
 */
export function mapSanityPropertyToProperty(doc: SanityProperty): Property {
  return {
    id: doc._id,
    slug: doc.slug,
    title: doc.title,
    description: doc.description,
    type: doc.type as Property["type"],
    status: doc.status as Property["status"],
    price: doc.price,
    location: doc.location,
    area: doc.area,
    bedrooms: doc.bedrooms,
    bathrooms: doc.bathrooms,
    features: doc.features || [],
    images: doc.images ?? [],
    createdAt: doc._createdAt,
    updatedAt: doc._updatedAt,
  };
}

/**
 * Map array of Sanity properties to app Property array
 * @param docs - Array of Sanity property documents
 * @returns Array of Property objects
 */
export function mapSanityProperties(docs: SanityProperty[]): Property[] {
  return docs.map(mapSanityPropertyToProperty);
}
