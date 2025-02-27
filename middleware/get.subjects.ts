import type { ISubject } from "~/types";

export default defineNuxtRouteMiddleware(async(to, from) => {
    const userStore = useUserStore();
    const subjectsStore = useSubjectsStore();

    const { token } = storeToRefs(userStore);
    const { subjects } = storeToRefs(subjectsStore);



    const response = await $fetch<ISubject[]>("https://astrontest.uz/mobile-api/api/uz/subjectuz?lang=uz", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "token": token.value,
        })
    });

    subjectsStore.set(response);
});
