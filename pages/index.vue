<script setup lang="ts">
import { LucideChevronRight, LucideMessageCircleQuestion, LucideWallet, LucideMonitor, LucideMoon, LucideSun, LucideFile, LucideLoader, LucideListCheck } from 'lucide-vue-next';
import { useMiniApp } from 'vue-tg';


const miniApp = useMiniApp();

const userStore = useUserStore();

const { token, id, balance } = storeToRefs(userStore);

const isLoading = ref(true);


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
    isLoading.value = true;
    let response = await $fetch<{ success: boolean, token: string, balance: string }>(`https://astrontest.uz/mobile-api/api/uz/get-token?tg_id=${miniApp.initDataUnsafe.user?.id}`, {
        method: "POST",
        body: JSON.stringify({
            "chat_id": miniApp.initDataUnsafe.user?.id,
        }),
        headers: {
            "Content-Type": "application/json",
        }
    });
    userStore.setToken(response.token);
    userStore.setBalance(response.balance);
    isLoading.value = false;
}


definePageMeta({
    middleware: ["is-telegram", "get-subjects"],
});

useSeoMeta({
    title: "Astron",
});


onMounted(() => {
    console.log(miniApp.initDataUnsafe);
    console.log(miniApp.isActive);
    // login();
    document.addEventListener('DOMContentLoaded', function () {
        const user = Telegram.WebApp.initDataUnsafe.user;

        console.log(user);
    });
    isLoading.value = false;
});

</script>

<template>
    <div v-if="!isLoading" class="h-screen w-full bg-gradient-to-r from-yellow-500 via-orange-500 to-orange-500">
        <div class="h-[12rem] p-5">
            <p>Salom {{ user }} {{ id }}</p>
            <p class="text-3xl">Astronga xush kelibsiz!</p>
            <p>ID: {{ miniApp.initDataUnsafe.user?.id }}</p>
            <p>Balans: {{ balance }}</p>
        </div>
        <div class="h-[calc(100%-12rem)] flex flex-col gap-2 bg-background border-t rounded-t-3xl p-5">
            <div class="bg-accent/30 rounded-md divide-y">
                <div class="flex justify-between p-3" @click="$router.push({ name: 'subjects', query: { type: 'quiz' } })">
                    <div class="flex items-center gap-2">
                        <LucideMessageCircleQuestion :size="20" />
                        <p>Savollar</p>
                    </div>
                    <div class="flex items-center justify-center">
                        <LucideChevronRight />
                    </div>
                </div>
                <div class="flex justify-between p-3" @click="$router.push({ name: 'subjects', query: { type: 'test' } })">
                    <div class="flex items-center gap-2">
                        <LucideListCheck :size="20" />
                        <p>Testlar</p>
                    </div>
                    <div class="flex items-center justify-center">
                        <LucideChevronRight />
                    </div>
                </div>
                <div class="flex justify-between p-3" @click="navigateTo({ name: 'files' })">
                    <div class="flex items-center gap-2">
                        <LucideFile :size="20" />
                        <p>Fayl market</p>
                    </div>
                    <div class="flex items-center justify-center">
                        <LucideChevronRight />
                    </div>
                </div>
                <div class="flex justify-between p-3" @click="navigateTo('https://payme.uz/fallback/merchant/?id=6694e98072bc9a1487f1c636', { external: true, open: { target: '_blank' } })">
                    <div class="flex items-center gap-2">
                        <LucideWallet :size="20" />
                        <p>Balansni to'ldirish</p>
                    </div>
                    <div class="flex items-center justify-center">
                        <LucideChevronRight />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="h-screen w-full flex items-center justify-center">
        <LucideLoader class="animate-spin" />
    </div>
</template>