<script setup lang="ts">

</script>

<template>
    <div>
        <NuxtRouteAnnouncer />
        <NuxtLoadingIndicator />
        <NuxtLayout>
            <ClientOnly>
                <NuxtPage />
            </ClientOnly>
        </NuxtLayout>
    </div>
</template>
