<script setup lang="ts">
import { LucideChevronLeft, LucideChevronRight, LucideLock, LucideLockKeyhole, LucideShoppingCart } from 'lucide-vue-next';


interface IClass {
    classes_id: string;
    subject_id: string;
    classes_name: string;
    classes_status: string;
    purchased: boolean;
    price: number;
}


const route = useRoute();
const router = useRouter();

const userStore = useUserStore();
const subjectsStore = useSubjectsStore();

const { token, balance } = storeToRefs(userStore);
const { subjects } = storeToRefs(subjectsStore);

const isLoading = ref(true);
const classes = ref<IClass[]>([]);



const getClassess = async () => {
    isLoading.value = true;
    let response = await $fetch<IClass[]>("https://astrontest.uz/mobile-api/api/uz/classesuz?lang=uz", {
        method: "POST",
        body: JSON.stringify({
            "token": token.value,
            "subjectid": route.params.subjectid,
        })
    });

    classes.value = response;
    isLoading.value = true;
};

const buyKlass = async (klass: IClass) => {
    await $fetch("https://astrontest.uz/mobile-api/api/uz/buy-class", {
        method: "POST",
        body: JSON.stringify({
            "token": token.value,
            "class_id": klass.classes_id
        })
    });
    getClassess();
};


definePageMeta({
    middleware: [
        "is-telegram",
        "get-subjects",
    ],
});

onMounted(() => {
    getClassess();
    isLoading.value = false;
});
</script>

<template>
    <div class="h-screen w-full">
        <div class="sticky top-0 z-50 bg-background flex items-center gap-2 h-[3rem] p-2 border-b">
            <div class="border rounded-full p-1" @click="router.back()">
                <LucideChevronLeft />
            </div>
            <p>Sinflar</p>
        </div>
        <div class="h-[calc(100%-3rem)] flex flex-col gap-2 p-5">
            <br>
            <div class="bg-accent/30 rounded-md divide-y">
                <div v-for="klass in classes" class="flex justify-between p-2">
                    <div class="flex items-center gap-2">
                        <p class="">{{ klass.classes_name }} {{ klass.purchased }}</p>
                    </div>
                    <div class="flex items-center justify-center">
                        <LucideChevronRight v-if="klass.purchased"
                            @click="navigateTo({ name: 'subjects-subjectid-classid', params: { subjectid: klass.subject_id, classid: klass.classes_id }, query: $route.query })" />
                        <Dialog v-else>
                            <DialogTrigger>
                                <LucideLockKeyhole />
                            </DialogTrigger>
                            <DialogContent>
                                <p>{{ klass.classes_name }} savol-javobini ochish uchun "Testlar" bo'limida ushbu
                                    darslik uchun to'lov qiling!</p>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
            <br>
        </div>
    </div>
</template>