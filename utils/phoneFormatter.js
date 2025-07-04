export const formatPhoneNumber = (value) => {
  if (!value) return "";

  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.startsWith("7")) {
    const match = digits.slice(1).match(/^(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/);
    return `+7${match ? ` (${match[1] || ""}) ${match[2] || ""}${match[3] ? "-" + match[3] : ""}${match[4] ? "-" + match[4] : ""}` : ""}`;
  }

  return digits;
};