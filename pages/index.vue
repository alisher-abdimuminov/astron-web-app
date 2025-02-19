<script setup lang="ts">
import { MainButton, useWebAppPopup, useMiniApp } from 'vue-tg'


const { showAlert } = useWebAppPopup();
const miniApp = useMiniApp();

console.log(miniApp);
</script>

<template>
    <div>
        <ClientOnly>
            <MainButton text="Open alert" @click="showAlert('Hello')" />
        </ClientOnly>
    </div>
</template>