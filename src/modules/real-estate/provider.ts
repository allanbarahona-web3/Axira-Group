import { type Property, type PropertyFilter, type PropertyStatus } from "./types";
import { sanityClient, isSanityConfigured } from "./sanityClient";
import { mapSanityProperties, mapSanityPropertyToProperty, type SanityProperty } from "./sanityMapper";
import {
  PROPERTIES_QUERY,
  PROPERTY_BY_SLUG_QUERY,
  PROPERTIES_BY_STATUS_QUERY,
  PROPERTIES_FILTERED_QUERY,
} from "./sanityQueries";

/**
 * Real Estate Data Provider
 * 
 * Integrated with Sanity CMS with mock data fallback
 * 
 * If SANITY env vars are configured, fetches from Sanity CMS.
 * Otherwise, returns mock data for development.
 * 
 * Usage:
 * - Import getProperties() for listing pages
 * - Import getPropertyBySlug() for detail pages
 */

const mockProperties: Property[] = [
  {
    id: "1",
    slug: "luxury-penthouse-marbella",
    title: "Luxury Penthouse Marbella",
    description: "Exquisite penthouse apartment with panoramic sea views in the heart of Marbella's Golden Mile. Features include a private terrace, infinity pool, and premium finishes throughout.",
    type: "penthouse",
    status: "available",
    price: "€2,850,000",
    location: "Marbella, Spain",
    area: "285 m²",
    bedrooms: 4,
    bathrooms: 4,
    features: [
      "Sea views",
      "Private terrace",
      "Infinity pool",
      "Underground parking",
      "24/7 security",
      "Gym access",
    ],
    images: [],
    createdAt: "2026-01-15T00:00:00Z",
    updatedAt: "2026-02-01T00:00:00Z",
  },
  {
    id: "2",
    slug: "modern-villa-algarve",
    title: "Modern Villa Algarve",
    description: "Contemporary architectural masterpiece located in the prestigious Quinta do Lago area. This stunning villa offers the perfect blend of luxury and comfort.",
    type: "villa",
    status: "available",
    price: "€3,200,000",
    location: "Algarve, Portugal",
    area: "420 m²",
    bedrooms: 5,
    bathrooms: 5,
    features: [
      "Golf course views",
      "Private garden",
      "Heated pool",
      "Smart home system",
      "Wine cellar",
      "Home cinema",
    ],
    images: [],
    createdAt: "2026-01-20T00:00:00Z",
    updatedAt: "2026-02-05T00:00:00Z",
  },
  {
    id: "3",
    slug: "beachfront-apartment-dubai",
    title: "Beachfront Apartment Dubai",
    description: "Sophisticated beachfront residence in Dubai Marina with stunning views of the Arabian Gulf. Premium amenities and world-class finishes.",
    type: "apartment",
    status: "reserved",
    price: "AED 5,900,000",
    location: "Dubai Marina, UAE",
    area: "245 m²",
    bedrooms: 3,
    bathrooms: 3,
    features: [
      "Beach access",
      "Panoramic views",
      "Concierge service",
      "Spa facilities",
      "Restaurant",
      "Valet parking",
    ],
    images: [],
    createdAt: "2026-02-01T00:00:00Z",
    updatedAt: "2026-02-10T00:00:00Z",
  },
  {
    id: "4",
    slug: "investment-land-mallorca",
    title: "Investment Land Mallorca",
    description: "Prime development land in Son Vida, Mallorca's most exclusive residential area. Excellent investment opportunity with approved building permits.",
    type: "land",
    status: "available",
    price: "€1,750,000",
    location: "Son Vida, Mallorca",
    area: "2,500 m²",
    bedrooms: 0,
    bathrooms: 0,
    features: [
      "Building permits",
      "Mountain views",
      "Exclusive area",
      "Utilities ready",
      "Gated community",
    ],
    images: [],
    createdAt: "2026-01-25T00:00:00Z",
    updatedAt: "2026-02-08T00:00:00Z",
  },
  {
    id: "5",
    slug: "boutique-townhouse-lisbon",
    title: "Boutique Townhouse Lisbon",
    description: "Beautifully restored townhouse in Lisbon's historic Chiado district. Combines traditional Portuguese charm with modern luxury amenities.",
    type: "townhouse",
    status: "sold",
    price: "€1,450,000",
    location: "Chiado, Lisbon",
    area: "320 m²",
    bedrooms: 4,
    bathrooms: 3,
    features: [
      "Historic district",
      "Original features",
      "Roof terrace",
      "Modern kitchen",
      "Wine cellar",
      "Guest suite",
    ],
    images: [],
    createdAt: "2025-12-10T00:00:00Z",
    updatedAt: "2026-01-30T00:00:00Z",
  },
  {
    id: "6",
    slug: "commercial-retail-london",
    title: "Commercial Retail Space London",
    description: "Prime retail unit in London's prestigious Mayfair district. High foot traffic area with excellent visibility and transport links.",
    type: "commercial",
    status: "available",
    price: "£4,500,000",
    location: "Mayfair, London",
    area: "185 m²",
    bedrooms: 0,
    bathrooms: 2,
    features: [
      "Prime location",
      "High street frontage",
      "Commercial lease",
      "Established tenants",
      "Strong ROI",
    ],
    images: [],
    createdAt: "2026-02-05T00:00:00Z",
    updatedAt: "2026-02-12T00:00:00Z",
  },
];

/**
 * Get all properties
 * Fetches from Sanity if configured, otherwise returns mock data
 */
export async function getProperties(): Promise<Property[]> {
  if (isSanityConfigured()) {
    try {
      const properties = await sanityClient.fetch<SanityProperty[]>(PROPERTIES_QUERY);
      return mapSanityProperties(properties);
    } catch (error) {
      console.error("Error fetching properties from Sanity:", error);
      // Fallback to mock data on error
      return mockProperties;
    }
  }
  
  return mockProperties;
}

/**
 * Get filtered properties
 * Fetches from Sanity with filters if configured, otherwise filters mock data
 */
export async function getFilteredProperties(filter: PropertyFilter): Promise<Property[]> {
  if (isSanityConfigured()) {
    try {
      const params: Record<string, any> = {};
      
      if (filter.status && filter.status.length > 0) {
        params.status = filter.status;
      }
      
      if (filter.type && filter.type.length > 0) {
        params.type = filter.type;
      }
      
      if (filter.location) {
        params.location = `*${filter.location}*`;
      }
      
      const properties = await sanityClient.fetch<SanityProperty[]>(
        PROPERTIES_FILTERED_QUERY,
        params
      );
      return mapSanityProperties(properties);
    } catch (error) {
      console.error("Error fetching filtered properties from Sanity:", error);
      // Fallback to filtered mock data on error
      return filterMockProperties(filter);
    }
  }
  
  return filterMockProperties(filter);
}

/**
 * Get property by slug
 * Fetches from Sanity if configured, otherwise searches mock data
 */
export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  if (isSanityConfigured()) {
    try {
      const property = await sanityClient.fetch<SanityProperty | null>(
        PROPERTY_BY_SLUG_QUERY,
        { slug }
      );
      
      if (!property) return null;
      
      return mapSanityPropertyToProperty(property);
    } catch (error) {
      console.error("Error fetching property from Sanity:", error);
      // Fallback to mock data on error
      return mockProperties.find(p => p.slug === slug) || null;
    }
  }
  
  return mockProperties.find(p => p.slug === slug) || null;
}

/**
 * Get properties by status
 * Fetches from Sanity if configured, otherwise filters mock data
 */
export async function getPropertiesByStatus(status: PropertyStatus): Promise<Property[]> {
  if (isSanityConfigured()) {
    try {
      const properties = await sanityClient.fetch<SanityProperty[]>(
        PROPERTIES_BY_STATUS_QUERY,
        { status }
      );
      return mapSanityProperties(properties);
    } catch (error) {
      console.error("Error fetching properties by status from Sanity:", error);
      // Fallback to mock data on error
      return mockProperties.filter(p => p.status === status);
    }
  }
  
  return mockProperties.filter(p => p.status === status);
}

/**
 * Helper function to filter mock properties
 */
function filterMockProperties(filter: PropertyFilter): Property[] {
  let filtered = [...mockProperties];
  
  if (filter.status && filter.status.length > 0) {
    filtered = filtered.filter(p => filter.status!.includes(p.status));
  }
  
  if (filter.type && filter.type.length > 0) {
    filtered = filtered.filter(p => filter.type!.includes(p.type));
  }
  
  if (filter.location) {
    filtered = filtered.filter(p => 
      p.location.toLowerCase().includes(filter.location!.toLowerCase())
    );
  }
  
  return filtered;
}

// Deprecated: Use getProperties() instead
export const getMockProperties = getProperties;
