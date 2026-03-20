import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Classic SRS Speaking",
    short_name: "Classic SRS",
    description: "Mobile-first PWA do codziennej nauki hiszpanskiego z naciskiem na mowienie.",
    start_url: "/today",
    display: "standalone",
    background_color: "#fff6ed",
    theme_color: "#fff6ed",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml"
      },
      {
        src: "/maskable-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable"
      }
    ]
  };
}
