export function formatArticleDate(date: string, month: "short" | "long" = "short") {
  const parsed = new Date(`${date.slice(0, 10)}T00:00:00.000Z`);
  if (Number.isNaN(parsed.getTime())) return "Date unavailable";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month,
    year: "numeric",
    timeZone: "UTC",
  }).format(parsed);
}
