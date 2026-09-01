export const brand = {
  name: "Rove Addis Labs",
  shortName: "Rove",
  productName: "Rove Addis",

  tagline: "Software. Products. Intelligent Systems.",

  description:
    "Rove Addis Labs builds software products, digital solutions, SaaS platforms, and intelligent systems for businesses and organizations.",

  location: "Addis Ababa, Ethiopia",

  // Year the company started — adjust to the real founding year.
  founded: "2024",

  positioning:
    "A software product and solutions company building digital products, SaaS platforms, and intelligent systems.",

  // Placeholder contact details — replace with the real ones.
  contact: {
    email: "hello@roveaddislabs.com",
    phone: "+251 90 123 4567",
    hours: "Mon – Fri · 9:00 AM – 6:00 PM",
  },

  social: {
    facebook: "https://web.facebook.com/profile.php?id=61592743722641",
    instagram: "",
    linkedin: "",
    github: "",
    x: "",
  },

  colors: {
    /**
     * Core Rove brand accent.
     *
     * This is intentionally kept in one place so the brand
     * can be refined later without changing individual components.
     */
    accent: "#28B5B1",
    dark: "#0F2933",
    light: "#F7F8F6",
  },
} as const;
