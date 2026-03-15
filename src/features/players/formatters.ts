export function formatRosterStatus(status: string | null | undefined): string {
  if (!status) return 'Unspecified';

  return status
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function formatDate(date: string | null | undefined): string {
  if (!date) return 'Unknown';

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
}

export function formatHeight(heightInches: number | null | undefined): string {
  if (!heightInches) return 'Unknown';

  const feet = Math.floor(heightInches / 12);
  const inches = heightInches % 12;
  return `${feet}'${inches}"`;
}

export function formatWeight(weightLbs: number | null | undefined): string {
  if (!weightLbs) return 'Unknown';
  return `${weightLbs} lbs`;
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}
