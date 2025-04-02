<script setup lang="ts">
import { LucideChevronLeft, LucideChevronRight, LucideLock } from 'lucide-vue-next';
import type { ISubject } from '~/types';


const route = useRoute();
const router = useRouter();

const subjectsStore = useSubjectsStore();

const { subjects } = storeToRefs(subjectsStore);

const isLoading = ref(true);

const userStore = useUserStore();

const { token, balance } = storeToRefs(userStore);

definePageMeta({
    middleware: ["get-subjects", "is-telegram"],
});


const getSubjects = async () => {
    const response = await $fetch<ISubject[]>("https://astrontest.uz/mobile-api/api/uz/subjectuz?lang=uz", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "token": token.value,
        })
    });
    
    subjectsStore.set(response);
}


const buySubject = async (subject: ISubject) => {
    let response = await $fetch("https://astrontest.uz/mobile-api/api/uz/buy-subject", {
        method: "POST",
        body: JSON.stringify({
            "token": token.value,
            "subject_id": subject.subject_id
        })
    });
    getSubjects();
}


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
                <div v-for="subject in subjects" class="flex justify-between p-2" @click="() => { (subject.purchased || route.query.type === 'quiz') ? navigateTo({ name: 'subjects-subjectid', params: { subjectid: subject.subject_id }, query: $route.query }) : console.log('Sotib olinmagan') }">
                    <div class="flex items-center gap-2">
                        <p class="">{{ subject.subject_name }}</p>
                    </div>
                    <div class="flex items-center justify-center">
                        <Dialog>
                            <DialogTrigger v-if="route.query.type !== 'quiz' && !subject.purchased">
                                <Button size="xs">
                                    <LucideLock :size="15" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Eslatma</DialogTitle>
                                    <DialogDescription></DialogDescription>
                                </DialogHeader>
                                <p class="text-center" v-if="parseInt(balance) >= 50000">
                                    <span class="font-bold">"{{ subject.subject_name }}"</span> ni ochish uchun bir martalik to'lov qiling.
                                    <br>
                                    <span>To'lov summasi: 50 000 so'm</span>
                                </p>
                                <p class="text-center" v-else>
                                    Balansingizda yetarli mablag' mavjud emas. Hisobingizni to'ldiring. <br>
                                    <span>Fanni ochish uchun bir martalik to'lov summasi: 50 000 so'm.</span>
                                </p>
                                <DialogFooter class="flex-row-reverse gap-2">
                                    <DialogClose>
                                        <Button v-if="parseInt(balance) >= 50000" @click="buySubject(subject)">To'lov qilish</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        <LucideChevronRight v-if="route.query.type === 'quiz' || subject.purchased" />
                    </div>
                </div>
            </div>
            <br>
        </div>
    </div>
</template>