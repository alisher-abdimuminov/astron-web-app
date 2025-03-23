import { read, write } from "~/db";

export default defineEventHandler(() => {
    const data = read();
    const viewers = data.viewers + 1;

    write(viewers);

    return { viewers };
});
