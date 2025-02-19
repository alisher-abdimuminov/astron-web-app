<script setup lang="ts">

</script>

<template>
    <div>
        <NuxtRouteAnnouncer />
        <NuxtLayout>
            <ClientOnly>
                <NuxtPage />
            </ClientOnly>
        </NuxtLayout>
    </div>
</template>
