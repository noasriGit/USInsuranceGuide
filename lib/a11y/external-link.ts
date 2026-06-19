/** Screen-reader suffix for links that open a new browsing context. */
export const NEW_TAB_SUFFIX = "(opens in new tab)";

export function newTabAriaLabel(linkText: string): string {
  return `${linkText} ${NEW_TAB_SUFFIX}`;
}
