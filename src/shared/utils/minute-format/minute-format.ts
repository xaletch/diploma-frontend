export function minuteFormat(minute: number): string {
  if (minute > 60) {
    return `${minute / 60} час. ${minute % 60} мин.`;
  }
  return `${minute} мин`;
}