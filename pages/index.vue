<script setup lang="ts">
import { LucideChevronRight, LucideFlaskConical, LucideMessageCircleQuestion, LucideWallet, LucideMonitor, LucideMoon, LucideSun } from 'lucide-vue-next';
import { useMiniApp } from 'vue-tg'


const miniApp = useMiniApp();

const userStore = useUserStore();

const { token, id } = storeToRefs(userStore)


const user = computed(() => {
    if (miniApp.initDataUnsafe.user) {
        if (miniApp.initDataUnsafe.user.first_name) {
            return miniApp.initDataUnsafe.user.first_name;
        } else if (miniApp.initDataUnsafe.user.username) {
            return miniApp.initDataUnsafe.user.username;
        } else {
            return miniApp.initDataUnsafe.user.id;
        }
    } else {
        return "User";
    }
});


const login = async () => {
    // create a new user
    let response = await $fetch<{ message: string }>("https://astrontest.uz/mobile-api/api/uz/create-user/", {
        method: "POST",
        body: JSON.stringify({
            "chat_id": miniApp.initDataUnsafe.user?.id,
        }),
        headers: {
            "Content-Type": "application/json",
        }
    });

    console.log(response);

    let response2 = await $fetch<{ token: string }>(`https://astrontest.uz/mobile-api/api/uz/get-token?tg_id=${miniApp.initDataUnsafe.user?.id}`, {
            headers: {
            "Content-Type": "application/json",
        }
    });
    console.log(response2);
    userStore.setToken(response2.token);

}


onMounted(() => {
    login();
});

</script>

<template>
    <div class="h-screen w-full bg-gradient-to-r from-blue-500 via-green-500 to-sky-500">
        <div class="h-[12rem] p-5">
            <p>Salom {{ user }} {{ token }} {{ id }}</p>
            <p class="text-3xl">Astronga xush kelibsiz!</p>
        </div>
        <div class="h-[calc(100%-12rem)] flex flex-col gap-2 bg-background border-t rounded-t-3xl p-5">
            <div class="bg-accent/30 rounded-md divide-y">
                <div class="flex justify-between p-3">
                    <div class="flex items-center gap-2">
                        <LucideMessageCircleQuestion :size="20" />
                        <p>Savollar</p>
                    </div>
                    <div class="flex items-center justify-center">
                        <LucideChevronRight />
                    </div>
                </div>
                <div class="flex justify-between p-3">
                    <div class="flex items-center gap-2">
                        <LucideFlaskConical :size="20" />
                        <p>Testlar</p>
                    </div>
                    <div class="flex items-center justify-center">
                        <LucideChevronRight />
                    </div>
                </div>
                <div class="flex justify-between p-3">
                    <div class="flex items-center gap-2">
                        <LucideWallet :size="20" />
                        <p>Testlar</p>
                    </div>
                    <div class="flex items-center justify-center">
                        <LucideChevronRight />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>