<script setup lang="ts">
import { LucideChevronRight, LucideMessageCircleQuestion, LucideWallet, LucideMonitor, LucideMoon, LucideSun, LucideFile, LucideLoader, LucideListCheck, LucideRefreshCw, LucideDot, LucideBellPlus, LucideBell } from 'lucide-vue-next';
import { useMiniApp } from 'vue-tg';


const miniApp = useMiniApp();

const userStore = useUserStore();

const { token, id, balance } = storeToRefs(userStore);
const newFile = ref(false);

const isLoading = ref(true);
const viewers = ref(0);
const announcement = ref("");
const created = ref("");

miniApp.ready();

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
    let response = await $fetch<{ success: boolean, token: string, balance: string, new_file: boolean }>(`https://astrontest.uz/mobile-api/api/uz/get-token?tg_id=${miniApp.initDataUnsafe.user?.id}`, {
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
    newFile.value = response.new_file;
    isLoading.value = false;
}


definePageMeta({
    middleware: ["is-telegram", "get-subjects"],
});

useSeoMeta({
    title: "Astron",
});


onMounted(async() => {
    let date = new Date();
    let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    let month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
    let day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
    login();
    isLoading.value = false;
    let response = await $fetch<{ count: number }>(`https://astronapi.pythonanywhere.com/counter/${day}-${month}-${year}/`, {
        method: "POST",
    });
    viewers.value = response.count;

    let response2 = await $fetch<{ content: string, created: string }>("https://astronapi.pythonanywhere.com/announcement/");
    announcement.value = response2.content;
    created.value = response2.created;

});

</script>

<template>
    <div v-if="!isLoading" class="h-screen w-full bg-gradient-to-r from-yellow-500 via-orange-500 to-orange-500">
        <div class="fixed top-1 right-1 z-50 flex justify-end p-5">
            <LucideRefreshCw :size="15" @click="login" />
        </div>
        <p class="fixed bottom-2 left-2 border rounded-full p-1">Kundalik foydalanishlar soni: {{ viewers }}</p>
        <div class="h-[12rem] p-5">
            <p class="text-lg">Salom {{ user }}</p>
            <p class="text-3xl">Astronga xush kelibsiz!</p>
            <p class="text-lg">ID: {{ miniApp.initDataUnsafe.user?.id }}</p>
            <p class="text-lg">Balans: {{ new Intl.NumberFormat("uz-Uz").format(parseInt(balance)) }}</p>
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
                <div class="relative flex justify-between p-3" @click="navigateTo({ name: 'files' })">
                    <div class="flex items-center gap-2">
                        <LucideFile :size="20" />
                        <p>Fayl market</p>
                        <div v-if="newFile" class="absolute top-4 right-4">
                            <div class="w-4 h-4 rounded-full animate-ping bg-red-500"></div>
                        </div>
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
            <div v-if="announcement" class="bg-orange-500/10 border border-orange-500 rounded-md p-3 flex items-center gap-2">
                <div class="p-2">
                    <LucideBell class="text-orange-500 animate-bounce" />
                </div>
                <div v-html="announcement"></div>
            </div>
        </div>
    </div>
    <div v-else class="h-screen w-full flex items-center justify-center">
        <LucideLoader class="animate-spin" />
    </div>
</template>