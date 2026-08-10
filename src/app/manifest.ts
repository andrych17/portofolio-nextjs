import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Andry Huang Portfolio",
    short_name: "Andry Huang",
    description: "Senior Full-Stack & AI Systems Developer Portfolio",
    start_url: "/",
    display: "standalone",
    background_color: "#030014",
    theme_color: "#030014",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
