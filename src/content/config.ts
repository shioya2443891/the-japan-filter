import { defineCollection, z } from 'astro:content';

const tableware = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    updatedDate: z.date().optional(),
    // なぜこの商品を選んだか
    whySelected: z.string(),
    // How We Researchedボックス用
    researchSteps: z.array(z.object({ label: z.string(), detail: z.string() })),
    sourcesChecked: z.array(z.string()),
    lastVerified: z.string(),
  }),
});

export const collections = { tableware };
