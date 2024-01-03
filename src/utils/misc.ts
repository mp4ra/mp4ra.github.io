import sanitizeHtml from "sanitize-html";

const clean = (dirty: string, strict: boolean) => {
    if (strict)
        return sanitizeHtml(dirty, {
            allowedTags: [],
            allowedAttributes: {}
        });

    return sanitizeHtml(dirty, {
        allowedTags: ["b", "i", "em", "strong", "br", "a"],
        allowedAttributes: {
            a: ["href"]
        }
    });
};

export const capitalize = (str: string) => {
    if (str.length === 0) return str;
    return str
        .replace(/-/g, " ")
        .split(" ")
        .map((s) => s[0].toUpperCase() + s.slice(1))
        .join(" ");
};

export default function cleanRecords(records: object[], strict: boolean = false) {
    // Sanitize data
    return records.map((record: object) => {
        return Object.entries(record).reduce((acc, [key, value]) => {
            if (!value) return acc;
            return {
                ...acc,
                [key]: clean(value, strict).trim()
            };
        }, {});
    });
}
