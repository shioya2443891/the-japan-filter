import { defineCollection, z } from 'astro:content';

const ProductSchema = z.object({
  id: z.string(),
  brand: z.string().default(''),
  award: z.string().nullable().default(null),
  name: z.string(),
  priceTier: z.enum(['$', '$$', '$$$']),
  priceNote: z.string().nullable().default(null),
  setContents: z.string(),
  specs: z.array(z.object({ label: z.string(), value: z.string() })),
  origin: z.object({
    brandCountry: z.string(),
    madeIn: z.string().nullable().default(null),
    officialSeller: z.string().nullable().default(null),
  }),
  usNotes: z.array(z.string()),
  whyPicked: z.array(z.string()),
  ratings: z.object({
    stars: z.number().nullable().default(null),
    reviewCount: z.number().nullable().default(null),
    badge: z.string().nullable().default(null),
    verifiedAt: z.string(),
  }),
  amazon: z.object({
    url: z.string(),
    asin: z.string().nullable().default(null),
    affiliateTag: z.string().nullable().default(null),
    imageUrl: z.string().nullable().default(null),
  }),
  ctaLabel: z.string().default('Check on Amazon'),
});

const tableware = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    intro: z.string().optional(),
    publishDate: z.date(),
    updatedDate: z.date().optional(),
    whySelected: z.string(),
    researchSteps: z.array(z.object({ label: z.string(), detail: z.string() })),
    sourcesChecked: z.array(z.string()),
    lastVerified: z.string(),
    ogImage: z.string().optional(),
    products: z.array(ProductSchema).optional(),
    japanContext: z.object({
      heading: z.string().default("How It's Viewed in Japan"),
      inJapan: z.array(z.string()),
      forUsBuyers: z.array(z.string()),
    }).optional(),
    usBuyerNotes: z.array(z.string()).optional(),
    verdict: z.object({
      rating: z.enum(['recommended', 'conditional', 'not-recommended']),
      summary: z.string(),
      bestPick: z.string().nullable().default(null),
    }).optional(),
  }),
});

export const collections = { tableware };
