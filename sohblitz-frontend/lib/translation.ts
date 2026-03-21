export async function getTranslations(locale: string) {

  const messages = await import(`../languages/${locale}.json`);

  return messages.default;
}