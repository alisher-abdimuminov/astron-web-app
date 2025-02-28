<script setup lang="ts">
import { LucideChevronLeft, LucideChevronRight, LucideFile, LucideFiles, LucideShoppingCart } from 'lucide-vue-next';


interface IFile {
    file_id: string
    file_name: string
    file_price: string
    description: string
    created_at: string
}


const router = useRouter();


const files = ref<IFile[]>([]);
const isLoading = ref(true);


const getFiles = async () => {
    let response = await $fetch<{ success: boolean, data: IFile[] }>("https://astrontest.uz/mobile-api/api/uz/files/");

    if (response.success) {
        files.value = response.data;
    }

}



definePageMeta({
    // middleware: ["is-telegram", "get-subjects"],
});


onMounted(() => {
    getFiles();
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
                                <LucideFile />
                                <div class="flex flex-col">
                                    <p>{{ file.file_name }}</p>
                                    <p class="text-muted-foreground text-xs">{{ file.description }}</p>
                                </div>
                            </div>
                            <div class="flex items-center justify-center">
                                <Button size="sm"><LucideShoppingCart /> {{ file.file_price }}</Button>
                            </div>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="files_purchased">
                    Sotib olingan fayllar
                </TabsContent>
            </Tabs>
        </div>
    </div>
</template>