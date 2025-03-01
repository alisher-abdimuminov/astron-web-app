<script setup lang="ts">
import { LucideChevronLeft, LucideChevronRight } from 'lucide-vue-next';


interface IVariant {
    variant: string
    var_id: string
}

interface ITest {
    savol_id: string
    savol_nomi: string
    variant: IVariant[]
}


const route = useRoute();
const router = useRouter();

const userStore = useUserStore();
const subjectsStore = useSubjectsStore();

const { token } = storeToRefs(userStore);

const isLoading = ref(true);
const tests = ref<ITest[]>([]);



const getTests = async () => {
    isLoading.value = true;
    let response = await $fetch<string>("https://astrontest.uz/mobile-api/api/uz/testlaruz?lang=uz", {
        method: "POST",
        body: JSON.stringify({
            "token": token.value,
            "subjectid": route.params.subjectid,
            "classid": route.params.classid,
            "themeid": route.params.themeid,
        }),
        headers: {
            "Content-Type": "application/json",
        }
    });

    console.log(response);

    tests.value = JSON.parse(response);
    isLoading.value = true;
}


definePageMeta({
    middleware: ["get-subjects"],
});

onMounted(() => {
    getTests();
    isLoading.value = false;
});
</script>

<template>
    <div class="h-screen w-full">
        <div class="bg-background flex items-center gap-2 h-[3rem] p-2 border-b">
            <div class="border rounded-full p-1" @click="router.back()">
                <LucideChevronLeft />
            </div>
            <p>Test</p>
        </div>
        <div class="h-[calc(100%-3rem)] flex flex-col gap-2 px-5">
            <ScrollArea class="h-full">
                <br>
                <div class="flex flex-col gap-3">
                    <div v-for="test, index in tests" class="bg-accent/30 rounded-md p-2">
                        <p class="text-lg">{{ index+1 }}. {{ test.savol_nomi }}</p>
                        <RadioGroup class="pl-10" :name="`answer_${index+1}`">
                            <div v-for="variant in test.variant" class="flex items-center space-x-2">
                                <RadioGroupItem :value="variant.var_id" :id="`answer_${index+1}_${variant.var_id}`" />
                                <Label :for="`answer_${index+1}_${variant.var_id}`">{{ variant.variant }}</Label>
                            </div>
                        </RadioGroup>
                    </div>
                </div>
                <br>
            </ScrollArea>
        </div>
    </div>
</template>