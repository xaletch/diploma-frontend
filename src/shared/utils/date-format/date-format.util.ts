function formatDateTime (dateTime: string): string {
  try {
    const date = new Date(dateTime);
    
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  } catch (err) {
    console.error("неверный формат даты", err);
    return "неверный формат даты";
  }
};

/**
  ===== ПРЕОБРАЗОВАНИЕ ДАТЫ 31-03-2026 В ЧИСЛО МЕСЯЦ, ГОД =====
**/
function formatDate(date: string): string {
  const [year, month, day] = date.split('-');
  const months = [
    "Января", "Февраля", "Марта", 
    "Апреля", "Мая", "Июня", 
    "Июля", "Августа", "Сентября", 
    "Октября", "Ноября", "Декабря",
  ] as const;

  return `${parseInt(day, 10)} ${months[parseInt(month, 10) -1]}, ${year}`;
}

function formatDateToString(date: Date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}-${month}-${year}`;
}

function formatDateWeek(date?: Date | string): string {
  const months = [
    "Января", "Февраля", "Марта", 
    "Апреля", "Мая", "Июня", 
    "Июля", "Августа", "Сентября", 
    "Октября", "Ноября", "Декабря",
  ] as const;

  const weeks = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"] as const;

  let current_date: Date;

  if (!date) {
    current_date = new Date();
  } else if (date instanceof Date) {
    current_date = date;
  } else {
    const [day, month, year] = date.split("-").map(Number);
    if (!day || !month || !year) return "- - - - -";
    current_date = new Date(year, month - 1, day);
  }

  if (isNaN(current_date.getTime())) return "- - - - -";

  const dayOfWeek = weeks[current_date.getDay()];
  const dayNum = current_date.getDate();
  const monthName = months[current_date.getMonth()];
  const year = current_date.getFullYear();

  return `${dayOfWeek}, ${dayNum} ${monthName}, ${year}г.`;
}

export { formatDateTime, formatDate, formatDateWeek, formatDateToString };
