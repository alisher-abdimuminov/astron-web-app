import { read, write, formatDate } from "~/db";

export default defineEventHandler((event) => {
    const date = formatDate(new Date());
    
    const count = read(date) + 1;
    write(date, count);

    return { users: count };
});
