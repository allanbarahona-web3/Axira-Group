# Field Mapping Reference

This document shows how Sanity CMS fields map to the Next.js `Property` type.

## Sanity Schema → Next.js Property Type

| Sanity Field | Sanity Type | Next.js Property | Type | Notes |
|--------------|-------------|------------------|------|-------|
| `_id` | string | `id` | string | Sanity document ID |
| `_createdAt` | datetime | `createdAt` | string | ISO date string |
| `_updatedAt` | datetime | `updatedAt` | string | ISO date string |
| `slug.current` | string | `slug` | string | URL-friendly slug |
| `title` | string | `title` | string | Property title |
| `description` | text | `description` | string | Full description |
| `type` | string | `type` | PropertyType | apartment, villa, etc. |
| `status` | string | `status` | PropertyStatus | available, reserved, sold |
| `price` | string | `price` | string | Display price with currency |
| `location` | string | `location` | string | City, country |
| `area` | string | `area` | string | Display area with unit |
| `bedrooms` | number | `bedrooms` | number | Number of bedrooms |
| `bathrooms` | number | `bathrooms` | number | Number of bathrooms |
| `features` | array\<string\> | `features` | string[] | List of features |
| `coverImage` + `gallery` | image[] | `images` | string[] | **Combined into one array** |

## Special Handling: Images

### In Sanity Schema:
- `coverImage`: Single image (required)
- `gallery`: Array of images (optional)

### In Next.js:
- `images`: Array of URLs (combined from both fields)

### GROQ Query:
```groq
"images": [coverImage] + gallery[] {
  asset->,
  alt
}
```

This combines the cover image (as the first item) with all gallery images into a single array.

### Mapper Logic:
```typescript
// src/modules/real-estate/sanityMapper.ts
const images: string[] = doc.images
  ? doc.images.map((img) => {
      // If the image has a full URL, use it
      if (img.asset?.url) {
        return img.asset.url;
      }
      // Otherwise, build URL from asset reference
      return urlFor(img.asset);
    }).filter((url) => url !== "")
  : [];
```

## Property Type Enums

### PropertyType
Valid values:
- `apartment`
- `villa`
- `penthouse`
- `townhouse`
- `land`
- `commercial`

### PropertyStatus
Valid values:
- `available`
- `reserved`
- `sold`

## Example Property in Sanity

```json
{
  "_id": "property-123",
  "_type": "property",
  "title": "Luxury Penthouse Dubai Marina",
  "slug": {
    "current": "luxury-penthouse-dubai-marina"
  },
  "description": "Spectacular penthouse with Gulf views...",
  "type": "penthouse",
  "status": "available",
  "price": "AED 8,500,000",
  "location": "Dubai Marina, UAE",
  "area": "450 m²",
  "bedrooms": 4,
  "bathrooms": 5,
  "features": [
    "Private infinity pool",
    "Panoramic sea views",
    "Smart home system"
  ],
  "coverImage": {
    "asset": {
      "_ref": "image-abc123..."
    },
    "alt": "Main view of penthouse"
  },
  "gallery": [
    {
      "asset": {
        "_ref": "image-def456..."
      },
      "alt": "Living room"
    },
    {
      "asset": {
        "_ref": "image-ghi789..."
      },
      "alt": "Master bedroom"
    }
  ]
}
```

## Example Property in Next.js

```typescript
{
  id: "property-123",
  slug: "luxury-penthouse-dubai-marina",
  title: "Luxury Penthouse Dubai Marina",
  description: "Spectacular penthouse with Gulf views...",
  type: "penthouse",
  status: "available",
  price: "AED 8,500,000",
  location: "Dubai Marina, UAE",
  area: "450 m²",
  bedrooms: 4,
  bathrooms: 5,
  features: [
    "Private infinity pool",
    "Panoramic sea views",
    "Smart home system"
  ],
  images: [
    "https://cdn.sanity.io/.../abc123-800x600.jpg",  // coverImage
    "https://cdn.sanity.io/.../def456-800x600.jpg",  // gallery[0]
    "https://cdn.sanity.io/.../ghi789-800x600.jpg"   // gallery[1]
  ],
  createdAt: "2026-02-16T10:30:00Z",
  updatedAt: "2026-02-16T10:30:00Z"
}
```

## Adding New Fields

To add a new field:

1. **Add to Sanity Schema** (`property.schema.ts`):
   ```typescript
   defineField({
     name: 'yearBuilt',
     title: 'Year Built',
     type: 'number',
   })
   ```

2. **Update Next.js Type** (`src/modules/real-estate/types.ts`):
   ```typescript
   export interface Property {
     // ... existing fields
     yearBuilt?: number;
   }
   ```

3. **Update GROQ Query** (`src/modules/real-estate/sanityQueries.ts`):
   ```groq
   *[_type == "property"] {
     // ... existing fields
     yearBuilt
   }
   ```

4. **Update Mapper** (`src/modules/real-estate/sanityMapper.ts`):
   ```typescript
   return {
     // ... existing mappings
     yearBuilt: doc.yearBuilt,
   };
   ```

5. **Update UI** as needed to display the new field
