export function validateDurationSeconds(x: string) {
  return Number(x.replace(/[^\d]/g, '').slice(4, 6)) >= 60 ? true : false;
}
