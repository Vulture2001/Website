// src/lib/formatDate.ts
export function formatDate(date: string, locale: string = "en-GB") {
    return new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(new Date(date));
}
