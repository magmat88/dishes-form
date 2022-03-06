export function validateDurationMinutes(x: string) {
    return Number(x.replace(/[^\d]/g, '').slice(2, 4)) >= 60 ? true : false;
}
