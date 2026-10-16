export interface BlogLogo {
  src: string;
  alt: string;
  href?: string;
  wide?: boolean;
}

export const blogLogos = {
  lossfunk: {
    src: '/assets/logos/lossfunk.svg',
    alt: 'Lossfunk',
    href: 'https://lossfunk.com/',
    wide: true,
  },
  redwood: {
    src: '/assets/logos/redwood.svg',
    alt: 'Redwood Research',
    href: 'https://www.redwoodresearch.org/',
  },
  mats: {
    src: '/assets/logos/mats.svg',
    alt: 'MATS',
    href: 'https://www.matsprogram.org/',
  },
} satisfies Record<string, BlogLogo>;

export const blogLogoNames = Object.keys(blogLogos) as [keyof typeof blogLogos, ...(keyof typeof blogLogos)[]];
