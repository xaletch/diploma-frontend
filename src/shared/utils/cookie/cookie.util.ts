// get cookie
// NAME - cookie name
export const getCookie = (name: string) => {
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
// KEY - cookie name
// VALUE - cookie value
// MINUTES - cookie expiration time in minutes
export const setCookie = (key: string, value: string, minutes?: number): void => {
  let expires = "";
  if (typeof minutes === "number") {
    const now = new Date();
    now.setTime(now.getTime() + minutes * 60 * 1000);
    expires = `; expires=${now.toUTCString()}`;
  }
  document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}${expires}; path=/`;
}

// delete cookie
// KEY - cookie name
export const deleteCookie = (key: string): void => {
  setCookie(key, "", -1);
}
