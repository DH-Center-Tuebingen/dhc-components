
/**
 * Capitalize the first letter if the provided string.
 * @param {string} text - Text to capitalize. 
 * @returns {string} - Capitalized text
 */
export function capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
}
