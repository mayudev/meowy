export const themeColor = '#ffadad';

/**
 * randInt returns a random integer from the range (inclusive)
 */
export function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
