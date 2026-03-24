const DEFAULT_API_URL = "https://friendly-dev-backend-eepv.onrender.com/api";

export function getApiUrl(): string {
  const envUrl = import.meta.env.VITE_API_URL;
  if (typeof envUrl === "string" && envUrl.trim().length > 0) {
    return envUrl.trim().replace(/\/+$/, "");
  }
  return DEFAULT_API_URL;
}

