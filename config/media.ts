/**
 * Placeholder imagery for the marketing site.
 * Swap each URL for a real Rove Addis Labs photo when you have one — nothing
 * else needs to change. Any image host works (public <Image> uses `unoptimized`).
 */
function unsplash(id: string, width = 1200) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=70`;
}

export const media = {
  /** Home hero — a city skyline. Replace with an Addis Ababa shot. */
  heroSkyline: unsplash("1477959858617-67f85cf4f1df", 1500),

  /** "What we do" cards (home). */
  capabilities: {
    engineering: unsplash("1498050108023-c5249f4df085", 900),
    products: unsplash("1460925895917-afdab827c52f", 900),
    ai: unsplash("1451187580459-43490279c0fa", 900),
    platforms: unsplash("1517180102446-f3ece451e9d8", 900),
  },

  /** Solutions page cards. */
  solutions: {
    web: unsplash("1487058792275-0ad4aaf24ca7", 900),
    mobile: unsplash("1591808216268-ce0b82787efe", 900),
    saas: unsplash("1460925895917-afdab827c52f", 900),
    integration: unsplash("1550751827-4bd374c3f58b", 900),
  },

  /** About page — team / place. */
  about: unsplash("1522071820081-009f0129c71c", 1100),

  /**
   * Labs page — dark, tech / AI imagery.
   * To use the illustration from your mockup: save it as
   * `public/media/labs-hero.png` and set `labsHero: "/media/labs-hero.png"`.
   */
  labsHero: unsplash("1451187580459-43490279c0fa", 1400),
  labsFallbacks: [
    unsplash("1620712943543-bcc4688e7485", 800),
    unsplash("1550751827-4bd374c3f58b", 800),
    unsplash("1526628953301-3e589a6a8b74", 800),
  ],
};
