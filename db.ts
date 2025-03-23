import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import path from "path";

const VIEWERS_DIR = path.resolve("server/viewers");

// Sana formatini `dd-mm-yyyy` shaklga o‘tkazish
const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-GB").replace(/\//g, "-");
};

const read = (date: string): number => {
    const filePath = path.join(VIEWERS_DIR, `${date}.txt`);
    
    if (!existsSync(filePath)) {
        return 0;
    }

    return parseInt(readFileSync(filePath, "utf-8"), 10) || 0;
};

const write = (date: string, count: number) => {
    if (!existsSync(VIEWERS_DIR)) {
        mkdirSync(VIEWERS_DIR, { recursive: true });
    }

    const filePath = path.join(VIEWERS_DIR, `${date}.txt`);
    writeFileSync(filePath, count.toString(), "utf-8");
};

export { read, write, formatDate };
