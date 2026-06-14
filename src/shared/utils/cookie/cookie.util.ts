// get cookie
// NAME - cookie name
export const getCookie = (name: string): string | null => {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + "=")) {
      return cookie.substring(name.length + 1);
    }
  }

  return null;
}

// create cookie
type CookieOptions = {
  days?: number;
  hours?: number;
  minutes?: number;
  path?: string;
  secure?: boolean;
  sameSite?: "Strict" | "Lax" | "None";
}

export const setCookie = (key: string, val: string, opt?: CookieOptions): void => {
  let exp = "";
  if (opt?.days || opt?.hours || opt?.minutes) {
    const now = new Date();
    const totalMin = (opt.days || 0) * 24 * 60 + (opt.hours || 0) * 60 + (opt.minutes || 0);
    now.setTime(now.getTime() + totalMin * 60 * 1000);
    exp = `; expires=${now.toUTCString()}`;
  }

  const path = opt?.path ? `; path=${opt.path}` : "";
  const secure = opt?.secure !== false ? "; Secure" : "";
  const sameSite = `; SameSite=${opt?.sameSite || "Strict"}`;

  document.cookie = `${key}=${val || ""}${exp}${path}${secure}${sameSite}`;
}

// delete cookie
// KEY - cookie name
export const deleteCookie = (key: string): void => {
  document.cookie = `${key}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; Secure; SameSite=Strict`;
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
}
