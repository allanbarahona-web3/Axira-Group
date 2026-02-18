/**
 * Real Estate Module Types
 * 
 * Phase 1: Static types for mock data
 * Phase 2+: Will be replaced with CMS integration
 */

export type PropertyStatus = "available" | "reserved" | "sold";

export type PropertyType = 
  | "apartment"
  | "villa"
  | "penthouse"
  | "townhouse"
  | "land"
  | "commercial";

export interface Property {
  id: string;
  slug: string;
  title: string;
  description: string;
  type: PropertyType;
  status: PropertyStatus;
  price: string;
  location: string;
  area: string;
  bedrooms: number;
  bathrooms: number;
  features: string[];
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface PropertyFilter {
  status?: PropertyStatus[];
  type?: PropertyType[];
  minPrice?: number;
  maxPrice?: number;
  location?: string;
}
