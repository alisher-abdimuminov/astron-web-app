import { useMiniApp } from 'vue-tg';

export default defineNuxtPlugin((nuxtApp) => {
    const miniApp = useMiniApp();
    console.log('miniApp', miniApp);
});
