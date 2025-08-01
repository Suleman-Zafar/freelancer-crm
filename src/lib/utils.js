import clsx from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merge class names with tailwind conflict resolution
 * @param {...any[]} inputs - list of class names, strings, or conditionals
 * @returns {string} - final merged class string
 */
export function cn(...inputs) {
  return twMerge(clsx(...inputs))
}
