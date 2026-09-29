import { defineCollection, z } from 'astro:content';

const entryLinks = z.array(z.object({
  label: z.string().min(1),
  url: z.string().url(),
})).default([]);

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
    links: entryLinks,
    thumbnail: z.string().optional(),
  }),
});

const talksCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    authors: z.string().optional(),
    venue: z.string(),
    date: z.string().optional(),
    description: z.string().optional(),
    thumbnail: z.string().optional(),
    order: z.number().default(0),
    draft: z.boolean().default(false),
    links: entryLinks,
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
  talks: talksCollection,
  misc: miscCollection,
  blog: blogCollection,
};
