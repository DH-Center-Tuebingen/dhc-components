/**
 * Transforms a string to a capitalized version.
 * @example text => Text.
 * @param text {string} The text to transform.
 * @returns Capitalized text.
 */
export function capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
}