import { defineCollection, z } from 'astro:content';
import { blogLogoNames } from '../data/blog-logos';

const contextUrl = z.union([
  z.string().url().regex(/^https?:\/\//, 'Use an http or https link'),
  z.string().regex(/^\/(?!\/)\S*$/, 'Use a site-relative path starting with /'),
]);

const blogContext = z.object({
  text: z.string().trim().min(1),
  logos: z.array(z.union([
    z.enum(blogLogoNames),
    z.object({
      src: z.string().regex(/^\/(?!\/)\S+$/, 'Place your logo in public/ and use a path starting with /'),
      alt: z.string().trim().min(1),
      href: contextUrl.optional(),
      wide: z.boolean().default(false),
    }),
  ])).default([]),
});

const entryLinks = z.array(z.object({
  label: z.string().min(1),
  url: z.union([z.string().url(), z.string().regex(/^\/(?!\/)\S*$/, 'Use an absolute URL or a site-relative path starting with /')]),
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
    sortDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use YYYY-MM-DD').refine(value => {
      const date = new Date(value);
      return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
    }, 'Use a valid calendar date'),
    homepagePinned: z.boolean().default(false),
    readTime: z.string().optional(),
    pinned: z.boolean().default(false),
    context: blogContext.optional(),
    aiDisclosure: z.array(z.object({
      icon: z.enum(['fingerprint', 'seven-finger-hand']),
      text: z.string().trim().min(1),
    })).default([]),
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
