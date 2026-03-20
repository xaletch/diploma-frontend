export function minuteFormat(minute: number): string {
  if (minute <= 0) {
    return "0 мин";
  }
  
  const hours = Math.floor(minute / 60);
  const minutes = minute % 60;
  
  const parts: string[] = [];
  
  if (hours > 0) {
    const hourWord = hours === 1 ? "час." : "часа.";
    parts.push(`${hours} ${hourWord}`);
  }
  
  if (minutes > 0) {
    parts.push(`${minutes} мин.`);
  }
  
  return parts.join(" ");
}
