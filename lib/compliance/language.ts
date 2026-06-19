export const PROHIBITED_PHRASES = [
  "best insurance company",
  "cheapest insurance",
  "guaranteed savings",
  "everyone needs this coverage",
  "we recommend this policy for everyone",
  "get the lowest rate",
  "cheapest insurance guaranteed",
  "guaranteed lowest",
] as const;

export function containsProhibitedLanguage(text: string): string[] {
  const lower = text.toLowerCase();
  return PROHIBITED_PHRASES.filter((phrase) => lower.includes(phrase));
}
