import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    authors: z.string(),
    date: z.string(),
    link: z.string().url().optional(),
    linkLabel: z.string().default('GitHub'),
    thumbnail: z.string().optional(),
  }),
});

const researchCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    authors: z.string(),
    venue: z.string(),
    link: z.string().url().optional(),
    linkLabel: z.string().default('arXiv'),
    thumbnail: z.string().optional(),
  }),
});

const miscCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    authors: z.string(),
    description: z.string(),
    link: z.string().url().optional(),
    linkLabel: z.string().default('Link'),
    thumbnail: z.string().optional(),
  }),
});

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    readTime: z.string().optional(),
    pinned: z.boolean().default(false),
    teaser: z.string().optional(),
    thumbnail: z.string().optional(),
  }),
});

export const collections = {
  projects: projectsCollection,
  research: researchCollection,
  misc: miscCollection,
  blog: blogCollection,
};
