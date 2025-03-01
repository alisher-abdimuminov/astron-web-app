<script setup lang="ts">
import { LucideChevronLeft, LucideChevronRight } from 'lucide-vue-next';


const router = useRouter();

const subjectsStore = useSubjectsStore();

const { subjects } = storeToRefs(subjectsStore);

const isLoading = ref(true);

definePageMeta({
    middleware: ["get-subjects"],
});


onMounted(() => {
    isLoading.value = false;
});
</script>

<template>
    <div class="h-screen w-full">
        <div class="sticky top-0 flex items-center gap-2 h-[3rem] p-2 border-b">
            <div class="border rounded-full p-1" @click="router.back()">
                <LucideChevronLeft />
            </div>
            <p>Fanlar</p>
        </div>
        <div class="h-[calc(100%-3rem)] flex flex-col gap-2 p-5">
            <br>
            <div class="bg-accent/30 rounded-md divide-y">
                <div v-for="subject in subjects" class="flex justify-between p-2" @click="navigateTo({ name: 'subjects-subjectid', params: { subjectid: subject.subject_id }, query: $route.query })">
                    <div class="flex items-center gap-2">
                        <p class="break-all">{{ subject.subject_name }}</p>
                    </div>
                    <div class="flex items-center justify-center">
                        <LucideChevronRight />
                    </div>
                </div>
            </div>
            <br>
        </div>
    </div>
</template>