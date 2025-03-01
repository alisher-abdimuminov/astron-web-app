<script setup lang="ts">
import { LucideChevronLeft, LucideChevronRight } from 'lucide-vue-next';


interface IMavzu {
    mavzu_id: string
    fan_id: string
    sinf_id: string
    mavzu_nomi: string
    mavzu_status: string
}


const route = useRoute();
const router = useRouter();

const userStore = useUserStore();
const subjectsStore = useSubjectsStore();

const { token } = storeToRefs(userStore);
const { subjects } = storeToRefs(subjectsStore);

const isLoading = ref(true);
const themes = ref<IMavzu[]>([]);



const getClassess = async () => {
    isLoading.value = true;
    let response = await $fetch<IMavzu[]>("https://astrontest.uz/mobile-api/api/uz/testthemeuz?lang=uz", {
        method: "POST",
        body: JSON.stringify({
            "token": token.value,
            "subjectid": route.params.subjectid,
            "classesid": route.params.classid
        })
    });

    themes.value = response;
    isLoading.value = true;
}


definePageMeta({
    middleware: ["get-subjects"],
});

onMounted(() => {
    // getClassess();
    isLoading.value = false;
});
</script>

<template>
    <div class="h-screen w-full">
        <div class="bg-background flex items-center gap-2 h-[3rem] p-2 border-b">
            <div class="border rounded-full p-1" @click="router.back()">
                <LucideChevronLeft />
            </div>
            <p>Savollar</p>
        </div>
        <div class="h-[calc(100%-3rem)] flex flex-col gap-2 px-5">
            <ScrollArea class="h-full">
                <br>
                Savollar
                <br>
            </ScrollArea>
        </div>
    </div>
</template>