export const formatDate = (isoTimestamp: Date) => {
    const time = new Date(isoTimestamp).getTime();
    const now = new Date().getTime();

    const seconds = Math.floor((now - time) / 1000);

    const intervals = [
        { label: "y", seconds: 31536000 },
        { label: "m", seconds: 2592000 },
        { label: "w", seconds: 604800 },
        { label: "d", seconds: 86400 },
        { label: "hr", seconds: 3600 },
        { label: "min", seconds: 60 },
        { label: "sec", seconds: 1 },
    ];

    for (const { label, seconds: unit } of intervals) {
        const count = Math.floor(seconds / unit);
        if (count >= 1) {
            return `${count}${label}`;
        }
    }

    return "now";
};