<script setup lang="ts">
import { LucideChevronLeft, LucideChevronRight } from 'lucide-vue-next';


interface IClass {
    classess_id: string
    subject_id: string
    classes_name: string
    classes_status: string
}


const route = useRoute();
const router = useRouter();

const userStore = useUserStore();
const subjectsStore = useSubjectsStore();

const { token } = storeToRefs(userStore);
const { subjects } = storeToRefs(subjectsStore);

const isLoading = ref(true);



const getClassess = async () => {
    let response = await $fetch("https://astrontest.uz/mobile-api/api/uz/classesuz?lang=uz", {
        method: "POST",
        body: JSON.stringify({
            "token": token.value,
            "subjectid": route.params.subjectid,
        })
    });

    
}


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
            <p>Fanlar</p>
        </div>
        <div class="h-[calc(100%-3rem)] flex flex-col gap-2 p-5">
            <p>Fanlar</p>
            <div class="bg-accent/30 rounded-md divide-y">
                <div v-for="subject in subjects" class="flex justify-between p-2" @click="">
                    <div class="flex items-center gap-2">
                        <p class="w-3/4">{{ subject.subject_name }}</p>
                    </div>
                    <div class="flex items-center justify-center">
                        <LucideChevronRight />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>