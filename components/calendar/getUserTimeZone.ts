
export default function getUserTimeZone(): string {
  if (typeof window !== 'undefined') {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  }
  return 'UTC';
}
