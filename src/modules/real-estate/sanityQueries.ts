/**
 * Sanity GROQ Queries for Real Estate
 * 
 * These queries fetch property data from Sanity CMS.
 * Schema should match the Property type structure.
 */

/**
 * Query to get all properties
 * Ordered by creation date (newest first)
 * Combines coverImage and gallery into images array
 */
export const PROPERTIES_QUERY = `
  *[_type == "property"] | order(_createdAt desc) {
    _id,
    _createdAt,
    _updatedAt,
    "slug": slug.current,
    title,
    description,
    type,
    status,
    price,
    location,
    area,
    bedrooms,
    bathrooms,
    features,
    "images": array::compact([coverImage.asset->url] + gallery[].asset->url)
  }
`;

/**
 * Query to get a single property by slug
 * Combines coverImage and gallery into images array
 */
export const PROPERTY_BY_SLUG_QUERY = `
  *[_type == "property" && slug.current == $slug][0] {
    _id,
    _createdAt,
    _updatedAt,
    "slug": slug.current,
    title,
    description,
    type,
    status,
    price,
    location,
    area,
    bedrooms,
    bathrooms,
    features,
    "images": array::compact([coverImage.asset->url] + gallery[].asset->url)
  }
`;

/**
 * Query to get properties by status
 * Combines coverImage and gallery into images array
 */
export const PROPERTIES_BY_STATUS_QUERY = `
  *[_type == "property" && status == $status] | order(_createdAt desc) {
    _id,
    _createdAt,
    _updatedAt,
    "slug": slug.current,
    title,
    description,
    type,
    status,
    price,
    location,
    area,
    bedrooms,
    bathrooms,
    features,
    "images": array::compact([coverImage.asset->url] + gallery[].asset->url)
  }
`;

/**
 * Query to get properties with filters
 * Combines coverImage and gallery into images array
 */
export const PROPERTIES_FILTERED_QUERY = `
  *[_type == "property" 
    && (!defined($status) || status in $status)
    && (!defined($type) || type in $type)
    && (!defined($location) || location match $location)
  ] | order(_createdAt desc) {
    _id,
    _createdAt,
    _updatedAt,
    "slug": slug.current,
    title,
    description,
    type,
    status,
    price,
    location,
    area,
    bedrooms,
    bathrooms,
    features,
    "images": array::compact([coverImage.asset->url] + gallery[].asset->url)
  }
`;
