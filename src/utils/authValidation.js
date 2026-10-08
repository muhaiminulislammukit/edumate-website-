export function getLoginIdentifierData(identifier) {
  const value = identifier.trim();
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return { email: value.toLowerCase() };
  }

  const phone = value.replace(/[\s()-]/g, '');
  if (/^(?:\+?88)?01[3-9]\d{8}$/.test(phone)) {
    return { phone };
  }

  return null;
}
