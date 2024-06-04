export function formatNumber(value: number): string {
  return (value || 0)
    .toString()
    .replace(/\./, ',')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export function toDistance(_value: number): string {
  if (_value === null) return '-';

  const value = typeof _value === 'number' ? _value : parseInt(_value);

  if (value < 100000) return `${formatNumber(Math.round(value / 100) / 10)}\u00A0km`;

  return `${formatNumber(Math.round(value / 1000))}\u00A0km`;
}
