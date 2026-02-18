# Sanity CMS Schema for Axira Group Real Estate

This folder contains the Sanity schema definition for the Real Estate properties. Use this to set up a **separate** Sanity Studio project.

## 📋 Prerequisites

- Node.js 18+
- A Sanity account (free at [sanity.io](https://sanity.io))

---

## 🚀 Step-by-Step Setup

### Step 1: Create a New Sanity Project

```bash
# Install Sanity CLI globally
npm install -g @sanity/cli

# Create a new Sanity project in a separate folder (NOT in this Next.js project)
cd ~/projects  # or wherever you keep your projects
npm create sanity@latest -- --template clean --create-project "Axira Group CMS" --dataset production
```

When prompted:
- **Project name**: Axira Group CMS
- **Dataset**: production
- **Output path**: axira-cms (or your preferred name)

### Step 2: Navigate to Your New Sanity Project

```bash
cd axira-cms  # or whatever you named it
```

### Step 3: Copy the Schema Files

Copy the schema files from this folder to your Sanity project:

```bash
# From the Next.js project root, copy the schema files
cp sanity-schema/property.schema.ts YOUR_SANITY_PROJECT/schemas/
```

### Step 4: Update Sanity Schema Index

Edit `YOUR_SANITY_PROJECT/schemas/index.ts`:

```typescript
import property from './property.schema'

export const schema = {
  types: [property],
}
```

Or if you have `schemaTypes`:

```typescript
import property from './property.schema'

export const schemaTypes = [property]
```

### Step 5: Start Sanity Studio

```bash
# In your Sanity project folder
npm run dev
```

This will open Sanity Studio at `http://localhost:3333`

### Step 6: Create Sample Properties (Dubai Examples)

In Sanity Studio, click "+ Create" → "Property" and add these two properties:

#### Property 1: Luxury Penthouse Dubai Marina

- **Title**: Luxury Penthouse Dubai Marina
- **Slug**: luxury-penthouse-dubai-marina (auto-generated)
- **Description**: 
  ```
  Spectacular penthouse in Dubai Marina with breathtaking views of the Arabian Gulf and skyline. 
  This luxury residence features floor-to-ceiling windows, a private infinity pool, and premium finishes throughout.
  ```
- **Type**: Penthouse
- **Status**: Available
- **Price**: AED 8,500,000
- **Location**: Dubai Marina, UAE
- **Area**: 450 m²
- **Bedrooms**: 4
- **Bathrooms**: 5
- **Features**:
  - Private infinity pool
  - Panoramic sea views
  - Smart home system
  - Maid's room
  - Private elevator
  - 24/7 concierge
  - Underground parking (3 spaces)
  - Gym and spa access
- **Cover Image**: Upload a main image
- **Gallery**: Upload 4-6 additional images

#### Property 2: Modern Villa Palm Jumeirah

- **Title**: Modern Villa Palm Jumeirah
- **Slug**: modern-villa-palm-jumeirah (auto-generated)
- **Description**: 
  ```
  Exclusive beachfront villa on Palm Jumeirah's prestigious crescent. Contemporary architecture meets 
  luxury living with direct beach access, infinity pool, and stunning Burj Al Arab views.
  ```
- **Type**: Villa
- **Status**: Available
- **Price**: AED 15,750,000
- **Location**: Palm Jumeirah, Dubai
- **Area**: 650 m²
- **Bedrooms**: 5
- **Bathrooms**: 6
- **Features**:
  - Private beach access
  - Infinity pool
  - Home cinema
  - Wine cellar
  - Outdoor kitchen
  - Landscaped garden
  - Staff quarters
  - 4-car garage
- **Cover Image**: Upload a main image
- **Gallery**: Upload 6-8 additional images

### Step 7: Deploy Sanity Studio (Optional)

```bash
# In your Sanity project folder
npm run deploy
```

This creates a hosted version at `https://your-project.sanity.studio`

### Step 8: Get Your Credentials

After creating your Sanity project, you'll need:

1. **Project ID**: Found in `sanity.config.ts` or at [sanity.io/manage](https://sanity.io/manage)
2. **Dataset**: Usually `production`

### Step 9: Configure Next.js Environment

In your **Next.js project** (not Sanity project), create `.env.local`:

```bash
# Copy the example file
cp .env.local.example .env.local
```

Edit `.env.local` and add your credentials:

```env
# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_actual_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
```

### Step 10: Restart Next.js Dev Server

```bash
# In the Next.js project root
pnpm dev
```

Your site will now fetch real estate data from Sanity! 🎉

---

## 📝 GROQ Query Examples

These queries are already implemented in the Next.js project at `src/modules/real-estate/sanityQueries.ts`.

### Get All Properties

```groq
*[_type == "property"] | order(_createdAt desc) {
  _id,
  _createdAt,
  _updatedAt,
  slug,
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
  "images": [coverImage] + gallery[] {
    asset->,
    alt
  }
}
```

### Get Property by Slug

```groq
*[_type == "property" && slug.current == $slug][0] {
  _id,
  _createdAt,
  _updatedAt,
  slug,
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
  "images": [coverImage] + gallery[] {
    asset->,
    alt
  }
}
```

### Get Available Properties Only

```groq
*[_type == "property" && status == "available"] | order(_createdAt desc) {
  _id,
  _createdAt,
  _updatedAt,
  slug,
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
  "images": [coverImage] + gallery[] {
    asset->,
    alt
  }
}
```

---

## 🔄 Image Handling

The Next.js integration automatically handles Sanity images:

- **Cover Image**: Used as the first image in the gallery
- **Gallery**: Additional images appended to the images array
- **Image URLs**: Generated automatically using `@sanity/image-url`

The mapper in `src/modules/real-estate/sanityMapper.ts` combines `coverImage` and `gallery` into a single `images[]` array that the frontend expects.

---

## 🎨 Customization

### Adding New Fields

1. Edit `property.schema.ts` and add new fields
2. Deploy changes: `sanity deploy graphql` (if using GraphQL) or just restart Studio
3. Update `src/modules/real-estate/types.ts` in Next.js to match
4. Update mapper in `src/modules/real-estate/sanityMapper.ts`

### Changing Property Types

Edit the `type` field options in `property.schema.ts`:

```typescript
options: {
  list: [
    { title: 'Apartment', value: 'apartment' },
    { title: 'Your New Type', value: 'your-new-type' },
    // ...
  ],
}
```

---

## 🔒 API Token (Optional)

For private datasets, create an API token:

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Go to "API" → "Tokens"
4. Create a new token with "Read" permissions
5. Add to `.env.local`:

```env
SANITY_API_READ_TOKEN=your_token_here
```

---

## 🐛 Troubleshooting

### Next.js Still Shows Mock Data

1. Check `.env.local` has correct credentials
2. Restart Next.js dev server: `pnpm dev`
3. Check browser console for errors
4. Verify Sanity Studio has published content

### Images Not Showing

1. Ensure images are uploaded in Sanity Studio
2. Check `coverImage` is set (required field)
3. Verify CORS settings in Sanity (usually auto-configured)

### Build Errors

If you get errors during `pnpm build`:
1. Ensure at least one property is published in Sanity
2. Check that all required fields are filled
3. Verify environment variables are set

---

## 📚 Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Documentation](https://www.sanity.io/docs/groq)
- [Sanity Image URL Builder](https://www.sanity.io/docs/image-url)
- [Next.js + Sanity Guide](https://www.sanity.io/guides/sanity-nextjs-site-builder)

---

## ✅ Checklist

- [ ] Created Sanity project
- [ ] Copied schema files
- [ ] Updated schema index
- [ ] Started Sanity Studio
- [ ] Created 2 Dubai properties with images
- [ ] Deployed Studio (optional)
- [ ] Copied Project ID and Dataset to Next.js `.env.local`
- [ ] Restarted Next.js dev server
- [ ] Verified properties appear on site

---

**Need Help?** Check the Sanity documentation or the Next.js integration at `src/modules/real-estate/`
