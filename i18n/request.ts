import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing, defaultLocale } from "./routing";

type Dict = Record<string, unknown>;

function isPlainObject(v: unknown): v is Dict {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/**
 * Deep merge: every key from `primary` overrides `fallback`, recursively.
 * Used so partially-translated locales don't crash on missing keys — any key
 * not yet translated falls back to the default locale (English).
 */
function deepMerge(fallback: Dict, primary: Dict): Dict {
  const out: Dict = { ...fallback };
  for (const key of Object.keys(primary)) {
    const a = fallback[key];
    const b = primary[key];
    if (isPlainObject(a) && isPlainObject(b)) {
      out[key] = deepMerge(a, b);
    } else {
      out[key] = b;
    }
  }
  return out;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : defaultLocale;

  const [primary, fallback] = await Promise.all([
    import(`../messages/${locale}.json`).then((m) => m.default as Dict),
    locale === defaultLocale
      ? Promise.resolve({} as Dict)
      : import(`../messages/${defaultLocale}.json`).then((m) => m.default as Dict),
  ]);

  return {
    locale,
    messages: deepMerge(fallback, primary),
  };
});
