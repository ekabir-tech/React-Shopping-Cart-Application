/** Formats a number as US dollars, e.g. 1299.9 -> "$1,299.90". */
const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export default function formatPrice(value) {
  return formatter.format(value);
}
