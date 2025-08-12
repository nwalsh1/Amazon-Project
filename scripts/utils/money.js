export function formatCurrency(priceCents) {
  return (priceCents / 100).toFixed(2);
}
//sharing a function across multiple files with modules