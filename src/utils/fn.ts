import CONFIG from "./config";

/**
 * Validate Siriraj HN
 * @param hn - HN string
 * @returns Boolean, valid ?
 */
export function validateHN(hn: string): boolean {
  const hn_reg = new RegExp(`^\\d{${CONFIG.HNLength}}$`);
  return hn_reg.test(hn);
}
