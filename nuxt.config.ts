// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: false },
    modules: ["shadcn-nuxt", "@nuxtjs/tailwindcss", "@pinia/nuxt"],

    colorMode: {
        classPrefix: "",
        classSuffix: "",
    },

    app: {
        head: {
            script: [
                { src: 'https://telegram.org/js/telegram-web-app.js?56' }
            ],
        },
    },
    ssr: false,
});
