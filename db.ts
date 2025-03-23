import { readFileSync, writeFileSync, existsSync } from "fs";
import path from "path";

const DB_FILE = path.resolve("server/db.json");

// Sana formatini `dd-mm-yyyy` shaklga o‘tkazish
const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-GB").replace(/\//g, "-");
};

const read = (): { date: string; viewers: number } => {
    if (!existsSync(DB_FILE)) {
        return { date: formatDate(new Date()), viewers: 0 };
    }

    try {
        const data = JSON.parse(readFileSync(DB_FILE, "utf-8"));
        const today = formatDate(new Date());

        // Agar sana eski bo‘lsa, 0 dan boshlaymiz
        if (data.date !== today) {
            return { date: today, viewers: 0 };
        }

        return data;
    } catch {
        return { date: formatDate(new Date()), viewers: 0 };
    }
};

const write = (viewers: number) => {
    const data = { date: formatDate(new Date()), viewers };
    writeFileSync(DB_FILE, JSON.stringify(data, null, 4), "utf-8"); // JSON formatlash
};

export { read, write };
