export function setCookies(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; secure; SameSite=Strict`
}

export function getCookie(name: string) {
  return document.cookie.split('; ').reduce((r, c) => {
    const [key, val] = c.split('=')
    return key === name ? decodeURIComponent(val) : r
  }, '')
}

export function deleteCookie(name: string) {
  document.cookie = `${name}=;Max-Age=-99999999`
}
