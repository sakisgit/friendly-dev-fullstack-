  import { vercelPreset } from "@vercel/react-router/vite";
  import type { Config } from "@react-router/dev/config";

  export default {
    presets: [vercelPreset()],
    // Config options...
    // Server-side render by default, to enable SPA mode set this to `false`
    ssr: true,
  } satisfies Config;
