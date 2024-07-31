export function dateToNow(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();

  const dateMs = date.getTime();
  const nowMs = now.getTime();

  const diffMs = nowMs - dateMs;

  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) {
    return `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}`;
  } else if (diffDays >= 1 && diffDays < 31) {
    return `${diffDays}d`;
  } else if (diffDays >= 31 && diffDays < 365) {
    const diffMonths = Math.floor(diffDays / 30);
    return `${diffMonths}m`;
  } else {
    return `${String(date.getDate()).padStart(2, "0")}/${String(
      date.getMonth() + 1
    ).padStart(2, "0")}/${date.getFullYear()}`;
  }
}
