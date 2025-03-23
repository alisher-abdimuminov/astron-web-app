import { readFileSync, writeFileSync, existsSync } from "fs";
import path from "path";


const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-GB").replace(/\//g, "-");
};

const read = (): { date: string; viewers: number } => {
    if (!existsSync("db.json")) {
        return { date: formatDate(new Date()), viewers: 0 };
    }

    try {
        const data = JSON.parse(readFileSync("db.json", "utf-8"));
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
    writeFileSync("db.json", JSON.stringify(data, null, 4), "utf-8"); // JSON formatlash
};

export { read, write };
