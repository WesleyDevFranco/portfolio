import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    // Next 16 serve quality 75 por padrão; liberamos 90 para a foto do Hero.
    qualities: [75, 90],
  },
};

export default nextConfig;
