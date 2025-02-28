<script setup lang="ts">
import { useMiniApp } from 'vue-tg';
import { LucideChevronLeft, LucideChevronRight, LucideDownload, LucideFile, LucideFiles, LucideShoppingCart } from 'lucide-vue-next';


interface IFile {
    file_id: string
    file_name: string
    file_price: string
    description: string
    created_at: string
}

interface IPurchasedFile {
    file_id: string
    file_name: string
    file_price: string
    description: string
    created_at: string
}


const router = useRouter();
const miniApp = useMiniApp();

const userStore = useUserStore();

const { token, balance } = storeToRefs(userStore);


const files = ref<IFile[]>([]);
const purchasedFiles = ref<IPurchasedFile[]>([]);
const isLoading = ref(true);


const login = async () => {
    // create a new user
    let response = await $fetch<{ success: boolean, token: string, balance: string }>(`https://astrontest.uz/mobile-api/api/uz/get-token?tg_id=${miniApp.initDataUnsafe.user?.id}`, {
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
}

const getFiles = async () => {
    let response = await $fetch<{ success: boolean, data: IFile[] }>("https://astrontest.uz/mobile-api/api/uz/files/");

    if (response.success) {
        files.value = response.data;
    }

}

const getPurchasedFiles = async () => {
    let response = await $fetch<{ success: boolean, data: IPurchasedFile[] }>(`https://astrontest.uz/mobile-api/api/uz/purchased-files/?token=${token.value}`);

    if (response.success) {
        purchasedFiles.value = response.data;
    }
}

const buyFile = async (file: IFile) => {
    isLoading.value = true;
    let response = await $fetch("https://astrontest.uz/mobile-api/api/uz/buy-file/", {
        method: "POST",
        body: JSON.stringify({
            "file_id": file.file_id,
            "token": token.value,
        })
    });

    login();
    getFiles();
    getPurchasedFiles();
    isLoading.value = false;
}




definePageMeta({
    // middleware: ["is-telegram", "get-subjects"],
});


onMounted(() => {
    getFiles();
    getPurchasedFiles();
    isLoading.value = false;
});
</script>

<template>
    <div class="h-screen w-full">
        <div class="flex items-center gap-2 h-[3rem] p-2 border-b">
            <div class="border rounded-full p-1" @click="router.back()">
                <LucideChevronLeft />
            </div>
            <p>Fayllar</p>
        </div>
        <div class="h-[calc(100%-3rem)] flex flex-col gap-2 p-5">
            <Tabs default-value="files">
                <TabsList>
                    <TabsTrigger value="files">
                        <div class="flex items-center gap-1">
                            <LucideFiles :size="15" />
                            <p>Fayllar</p>
                        </div>
                    </TabsTrigger>
                    <TabsTrigger value="files_purchased">
                        <div class="flex items-center gap-1">
                            <LucideShoppingCart :size="15" />
                            <p>Sotib olinganlar</p>
                        </div>
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="files">
                    <div class="bg-accent/30 rounded-md divide-y">
                        <div v-for="file in files" class="flex justify-between p-2">
                            <div class="flex items-center gap-2">
                                <div>
                                    <LucideFile />
                                </div>
                                <div class="flex flex-col">
                                    <p>{{ file.file_name }}</p>
                                    <p class="text-muted-foreground text-xs break-all">{{ file.description }}asdddddddddddddddddddddddddddddddddddddddddddddddddd</p>
                                </div>
                            </div>
                            <div class="flex items-center justify-center">
                                <Dialog>
                                    <DialogTrigger v-if="parseFloat(balance) > parseFloat(file.file_price)">
                                        <Button size="sm"><LucideShoppingCart /> {{ file.file_price }}</Button>
                                    </DialogTrigger>
                                    <DialogContent class="w-3/4">
                                        <DialogHeader>
                                            <DialogTitle>Fayl sotib olish</DialogTitle>
                                            <DialogDescription></DialogDescription>
                                        </DialogHeader>
                                        <p>{{ file.file_name }} - ni sotib olasizmi?</p>
                                        <DialogFooter class="gap-2">
                                            <Button @click="buyFile(file)">Ha</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                                <Button v-if="parseFloat(balance) < parseFloat(file.file_price)" size="sm" variant="outline"><LucideShoppingCart /> {{ file.file_price }}</Button>
                            </div>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="files_purchased">
                    <div class="bg-accent/30 rounded-md divide-y">
                        <div v-for="file in purchasedFiles" class="flex justify-between p-2">
                            <div class="flex items-center gap-2">
                                <div>
                                    <LucideFile />
                                </div>
                                <div class="flex flex-col">
                                    <p>{{ file.file_name }}</p>
                                    <p class="text-muted-foreground text-xs break-all">{{ file.description }}</p>
                                </div>
                            </div>
                            <div class="flex items-center justify-center">
                                <Button size="sm"><LucideDownload /> Yuklab olish</Button>
                            </div>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    </div>
</template>