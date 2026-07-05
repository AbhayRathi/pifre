/**
 * Generates a deterministic, stable source record ID for deduplication.
 * Never use Date.now() as a source ID — timestamps prevent deduplication.
 */
export function makeSourceId(prefix: string, address: string): string {
  const slug = address
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
  return `${prefix}-${slug}`;
}
