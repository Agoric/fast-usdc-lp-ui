/**
 * Uses Intl.NumberFormat style='decimal' to add thousands separator to a
 * displayed number
 *
 * @param value
 */
export const formatNumber = new Intl.NumberFormat(undefined, {
  style: 'decimal',
  minimumFractionDigits: 2,
  maximumFractionDigits: 4,
}).format as (value: string | number | bigint | null) => string;
