export function formatDate(isoDate?: string): string {
  if (!isoDate) return "";

  const datePart = isoDate.split("T")[0];
  const [year, month, day] = datePart.split("-");

  if (!year || !month || !day) return isoDate;
  return `${day}/${month}/${year}`;
}
