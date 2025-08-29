<script setup lang="ts">
import { LucideChevronLeft } from 'lucide-vue-next';
import { useMiniApp } from 'vue-tg';


const router = useRouter();

const userStore = useUserStore();

const { id } = storeToRefs(userStore);


const isLoading = ref(true);


definePageMeta({
    middleware: ["is-telegram", "get-subjects"],
});


onMounted(() => {
    isLoading.value = false;
});
</script>

<template>
    <div class="h-screen w-full">
        <div class="flex items-center gap-2 h-[3rem] p-2 border-b">
            <div class="border rounded-full p-1" @click="router.back()">
                <LucideChevronLeft />
            </div>
            <p>Balansni to'ldirish</p>
        </div>
        <div class="h-[calc(100%-3rem)] flex flex-col items-center justify-center gap-2 p-5">
            <p class="text-lg font-bold">PayMe orqali to'lov qilish:</p>
            <div class="bg-transparent dark:bg-primary w-1/2 h-18 rounded-md" @click="navigateTo('https://payme.uz/fallback/merchant/?id=6694e98072bc9a1487f1c636', { open: { target: '_blank' }, external: true })">
                <img src="/assets/images/payme.png" alt="">
            </div>
            <p class="font-bold">ID: {{ id }}</p>
            <Separator />
            <p class="text-xl font-bold">Karta orqali to'lov qilish:</p>
            <span class="font-bold font-mono">9860 0101 3465 0976</span>
            <span class="text-sm">(I.Yo'ldoshev)</span>
            <span>
                Chekni <a class="font-bold" href="https://t.me/astron_corp">@astron_corp</a> ga yuboring.
            </span>
        </div>
    </div>
</template>