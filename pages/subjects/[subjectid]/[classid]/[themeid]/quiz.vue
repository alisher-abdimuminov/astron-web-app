<script setup lang="ts">
import { LucideChevronLeft, LucideChevronRight, LucideEye, LucideEyeClosed } from 'lucide-vue-next';


interface IQuiz {
    course_id: string
    fan_id: string
    sinf_id: string
    mavzu_id: string
    course_savol: string
    course_javob: string
}


const route = useRoute();
const router = useRouter();

const userStore = useUserStore();
const subjectsStore = useSubjectsStore();

const { token } = storeToRefs(userStore);

const isLoading = ref(true);
const quizzes = ref<IQuiz[]>([]);
const index = ref(0);
const open = ref(false);



const getQuizzes = async () => {
    isLoading.value = true;
    let response = await $fetch<string>("https://astrontest.uz/mobile-api/api/uz/coursesuz/", {
        method: "POST",
        body: JSON.stringify({
            "token": token.value,
            "subjectid": route.params.subjectid,
            "classid": route.params.classid,
            "mavzuid": route.params.themeid,
        })
    });

    quizzes.value = JSON.parse(response);
    isLoading.value = true;
}


const getQuiz = computed(() => (index: number = 0) => {
    return quizzes.value[index];
});


definePageMeta({
    middleware: ["is-telegram", "get-subjects"],
});

onMounted(() => {
    getQuizzes();
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
                <div class="bg-accent/30 rounded-md p-2">
                    <Collapsible v-if="getQuiz(index)" v-model:open="open">
                        <CollapsibleTrigger>
                            <div class="flex items-center gap-2 text-start text-lg">
                                <p>{{ getQuiz(index).course_savol }}</p>
                                <div>
                                    <LucideEye v-if="!open" :size="20" />
                                    <LucideEyeClosed v-else :size="20" />
                                </div>
                            </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <Separator />
                            <p class="text-green-500">{{ getQuiz(index).course_javob }}</p>
                        </CollapsibleContent>
                    </Collapsible>
                </div>
                <br>
                <div class="flex justify-between items-center">
                    <Button v-if="getQuiz(index-1)" @click="() => { index--; open = false }" size="icon" variant="outline" class="rounded-full"><LucideChevronLeft /></Button>
                    <div v-else></div>
                    <Button v-if="getQuiz(index+1)" @click="() => { index++; open = false }" size="icon" variant="outline" class="rounded-full"><LucideChevronRight /></Button>
                    <div v-else></div>
                </div>
                <br>
            </ScrollArea>
        </div>
    </div>
</template>