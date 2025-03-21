export function fixDate(dateString: string | undefined): string {
  if (!dateString || dateString.startsWith('0001-01-01')) {
    return 'N/A';
  }
  const date = new Date(dateString);
  date.setHours(date.getHours() + 1);
  return date.toLocaleString('de-DE');
}
