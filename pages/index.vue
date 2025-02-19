<script setup lang="ts">
import { LucideChevronRight, LucideFlaskConical, LucideMessageCircleQuestion, LucideWallet } from 'lucide-vue-next';
import { useMiniApp } from 'vue-tg'


const miniApp = useMiniApp();


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

</script>

<template>
    <div class="h-screen w-full bg-gradient-to-r from-orange-500 via-yellow-500 to-yellow-500">
        <div class="h-[12rem] p-5">
            <p>Hello {{ user }}</p>
            <p class="text-3xl">Welcome to Astron</p>
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