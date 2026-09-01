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

  /** "What we do" cards. */
  capabilities: {
    engineering: unsplash("1498050108023-c5249f4df085", 900),
    products: unsplash("1460925895917-afdab827c52f", 900),
    ai: unsplash("1451187580459-43490279c0fa", 900),
    platforms: unsplash("1517180102446-f3ece451e9d8", 900),
  },

  /** About page — team / place. */
  about: unsplash("1522071820081-009f0129c71c", 1100),
};
