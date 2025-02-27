<script setup lang="ts">
import { LucideChevronRight } from 'lucide-vue-next';
const router = useRouter();


const subjectsStore = useSubjectsStore();

const { subjects } = storeToRefs(subjectsStore);

</script>

<template>
    <div class="h-screen w-full">
        <div class="flex items-center gap-2 h-[3rem] p-2 border-b">
            <div class="border rounded-full p-1" @click="router.back()">
                <Icon class="text-xl" icon="lucide:chevron-left" />
            </div>
            <p>Fanlar</p>
        </div>
        <div class="h-[calc(100%-3rem)] flex flex-col gap-2 p-5">
            <p>Fanlar</p>
            <div class="bg-accent/30 rounded-md divide-y">
                <div v-for="subject in subjects" class="flex justify-between p-2" @click="">
                    <div class="flex items-center gap-2">
                        <p class="truncate">{{ subject.subject_name }}</p>
                    </div>
                    <div class="flex items-center justify-center">
                        <LucideChevronRight />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>