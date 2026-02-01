<script setup lang="ts">
import { useMiniApp } from 'vue-tg';
import { LucideChevronLeft, LucideChevronRight, LucideDownload, LucideFile, LucideFiles, LucideLoader, LucideShoppingCart, LucideThumbsUp, Target } from 'lucide-vue-next';


interface ICourse {
    handle: string;
    name: string;
    logo: string;
    likes: number;
    is_liked: boolean;
}


const router = useRouter();
const miniApp = useMiniApp();

const userStore = useUserStore();

const { token, id, balance } = storeToRefs(userStore);


const courses = ref<ICourse[]>([]);
const isLoading = ref(true);
const open = ref(false);

const orderedCourses = computed(() => {
    courses.value.sort((a, b) => b.likes - a.likes);
    return courses.value;
});

const login = async () => {
    // create a new user
    let response = await $fetch<{ success: boolean, token: string, balance: string; }>(`https://astrontest.uz/mobile-api/api/uz/get-token?tg_id=${miniApp.initDataUnsafe.user?.id}`, {
        method: "POST",
        body: JSON.stringify({
            "chat_id": miniApp.initDataUnsafe.user?.id,
        }),
        headers: {
            "Content-Type": "application/json",
        }
    });
    userStore.setToken(response.token);
    userStore.setBalance(response.balance);
};

const likeOrDislike = async (course: ICourse) => {
    let response = await $fetch("https://backend.astron.uz/api/v1/like_dislike/", {
        method: "post",
        body: JSON.stringify({
            "user_id": miniApp.initDataUnsafe.user?.id,
            "course_id": course.handle
        })
    });

    courses.value.map((c) => {
        if (c.handle === course.handle) {
            c.likes = c.is_liked ? c.likes - 1 : c.likes + 1;
            c.is_liked = !c.is_liked;
        }
    });
};

const getCourses = async () => {
    let response = await $fetch<ICourse[]>(`https://backend.astron.uz/api/v1/course_channels/?user_id=${id.value}`);

    courses.value = response;
};


definePageMeta({
    middleware: [
        // "is-telegram", 
        "get-subjects"
    ],
});


onMounted(() => {
    getCourses();
    isLoading.value = false;
});
</script>

<template>
    <div class="h-screen w-full">
        <div class="flex items-center gap-2 h-[3rem] p-2 border-b">
            <div class="border rounded-full p-1" @click="router.back()">
                <LucideChevronLeft />
            </div>
            <p>Online kurslar</p>
        </div>
        <div class="h-[calc(100%-3rem)] flex flex-col gap-2 p-5">
            <div class="bg-accent/30 rounded-md divide-y">
                <div v-for="course in orderedCourses" class="flex justify-between p-2">
                    <div class="flex items-center gap-2">
                        <div>
                            <img :src="course.logo" class="size-12 rounded-full border" />
                        </div>
                        <div class="flex flex-col">
                            <p class="text-lg">{{ course.name }}</p>
                            <Button @click="likeOrDislike(course)" size="xs"
                                :variant="course.is_liked ? 'liked' : 'ghost'" class="rounded-full">
                                <span>👍</span>
                                <span>{{ course.likes }}</span>
                            </Button>
                        </div>
                    </div>
                    <div @click="navigateTo(`https://t.me/${course.handle}`, { external: true, open: { target: '_blank' } })"
                        class="flex items-center justify-center">
                        <LucideChevronRight />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>