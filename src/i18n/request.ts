import { getRequestConfig } from 'next-intl/server';
import { cookies, headers } from 'next/headers';

export const locales = ['es', 'en', 'fr', 'de', 'it', 'pt', 'nl', 'pl', 'ru', 'sv'] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
  pt: 'Português',
  nl: 'Nederlands',
  pl: 'Polski',
  ru: 'Русский',
  sv: 'Svenska',
};

export const defaultLocale: Locale = 'es';

async function getLocaleFromRequest(): Promise<Locale> {
  // 1. Check cookies first
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get('NEXT_LOCALE')?.value;
  if (localeCookie && locales.includes(localeCookie as Locale)) {
    return localeCookie as Locale;
  }

  // 2. Check Accept-Language header
  const headersList = await headers();
  const acceptLanguage = headersList.get('Accept-Language');
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(',')
      .map((lang) => lang.split(';')[0].trim().substring(0, 2))
      .find((lang) => locales.includes(lang as Locale));
    
    if (preferredLocale) {
      return preferredLocale as Locale;
    }
  }

  // 3. Return default locale
  return defaultLocale;
}

export default getRequestConfig(async () => {
  const locale = await getLocaleFromRequest();

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
    timeZone: 'Europe/Madrid',
    now: new Date(),
  };
});
