export function buildWhatsAppUrl(phoneNumber: string, message: string) {
  const normalized = phoneNumber.replace(/[^\d]/g, '')
  const text = message.trim()
  const query = text ? `?text=${encodeURIComponent(text)}` : ''
  return `https://wa.me/${normalized}${query}`
}

