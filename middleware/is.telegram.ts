import { useMiniApp } from 'vue-tg';


export default defineNuxtRouteMiddleware((to, from) => {
    try {
        const miniApp = useMiniApp();
        const router = useRouter();
        
        if (miniApp.platform === "unknown") {
            router.push({ name: "scan" });
        }
    } catch {
        const router = useRouter();
        router.push({ name: "scan" });
    }
});
