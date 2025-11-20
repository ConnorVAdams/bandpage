export default function getUserTimeZone(): string {
  if (typeof window !== 'undefined' && window.Intl && window.Intl.DateTimeFormat) {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  }
  return 'UTC';
}
