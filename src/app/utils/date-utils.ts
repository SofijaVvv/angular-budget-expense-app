export function fixDate(dateString: string | undefined): string {
  if (!dateString || dateString.startsWith('0001-01-01')) {
    return 'N/A';
  }
  const date = new Date(dateString);
  return date.toLocaleString('de-DE', { timeZone: 'Europe/Berlin' });
}
