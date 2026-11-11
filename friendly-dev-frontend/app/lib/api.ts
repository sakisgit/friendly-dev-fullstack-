const DEFAULT_API_URL = "https://friendly-dev-backend-eepv.onrender.com/api";

export function getApiUrl(): string {
  const envUrl = import.meta.env.VITE_API_URL;
  if (typeof envUrl === "string" && envUrl.trim().length > 0) {
    return envUrl.trim().replace(/\/+$/, "");
  }
  return DEFAULT_API_URL;
}


const FALLBACK_IMAGE = "/images/no-image.png";

// Old Strapi media records still point at the previous Cloudinary cloud name.
const LEGACY_CLOUDINARY_CLOUD = "/duix09urz/";
const CLOUDINARY_CLOUD = "/sakis-dev/";

export function getImageUrl(url?: string | null): string {
  if (!url) return FALLBACK_IMAGE;
  return url.replace(LEGACY_CLOUDINARY_CLOUD, CLOUDINARY_CLOUD);
}
