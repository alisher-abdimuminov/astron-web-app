<script setup lang="ts">
import { MainButton, useWebAppPopup, useMiniApp } from 'vue-tg'


const { showAlert } = useWebAppPopup();
const miniApp = useMiniApp();

console.log(miniApp);

const getAuth = async () => {
    let response = await $fetch("/api/auth");
    console.log(response);
}

onMounted(() => {
    console.log("Response", getAuth());
});
</script>

<template>
    <div>
        <ClientOnly>
            <MainButton text="Open alert" @click="showAlert('Hello')" />
        </ClientOnly>
    </div>
</template>