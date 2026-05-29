export default defineNuxtConfig({
    compatibilityDate: "2024-11-01",
    devtools: { enabled: false },
    modules: ["shadcn-nuxt", "@nuxtjs/tailwindcss", "@pinia/nuxt"],

    components: [{ path: "components/ui", global: true, extensions: [".vue"] }],

    colorMode: {
        classPrefix: "",
        classSuffix: "",
    },

    app: {
        head: {
            script: [
                { src: "https://telegram.org/js/telegram-web-app.js?56" },
                {
                    src: "https://libtl.com/sdk.js",
                    "data-sdk": "show_11061643",
                    "data-zone": "11061643",
                },
            ],
        },
    },
    ssr: false,

    shadcn: {
        prefix: "",
        componentDir: "components/ui",
    },
});
