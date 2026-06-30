<script setup lang="ts">
import { LucideChevronLeft } from "lucide-vue-next";
import { useMiniApp } from "vue-tg";
import { cn } from "~/lib/utils";

const router = useRouter();
const miniApp = useMiniApp();

const userStore = useUserStore();
const { balance } = storeToRefs(userStore);

const isLoading = ref(true);

definePageMeta({
	middleware: ["get-subjects"],
});

onMounted(() => {
	isLoading.value = false;
});
</script>

<template>
	<div class="h-screen w-full">
		<div class="flex items-center gap-2 h-[3rem] p-2 border-b">
			<div class="border rounded-full p-1" @click="router.back()">
				<LucideChevronLeft />
			</div>
			<p>Balansni to'ldirish</p>
		</div>
		<div
			class="h-[calc(100%-3rem)] flex flex-col items-center justify-start gap-2 p-5"
		>
			<!-- <p class="text-lg font-bold">Payme orqali to'lov qilish:</p>
            <div class="bg-transparent dark:bg-primary w-1/2 h-18 rounded-md" @click="navigateTo('https://payme.uz/fallback/merchant/?id=6694e98072bc9a1487f1c636', { open: { target: '_blank' }, external: true })">
                <img src="/assets/images/payme.png" alt="">
            </div> -->
			<p class="font-bold mt-20">
				Balans:
				{{ new Intl.NumberFormat("uz-Uz").format(parseInt(balance)) }}
			</p>
			<p class="font-bold">ID: {{ miniApp.initDataUnsafe.user?.id }}</p>

			<div class="w-full max-w-sm py-2">
				<div class="relative h-56 mb-6 [perspective:1000px]">
					<Card
						:class="
							cn(
								'absolute inset-0 w-full h-full p-6 flex flex-col justify-between [backface-visibility:hidden] shadow-xl',
							)
						"
					>
						<div className="flex justify-between items-start">
							<div class="w-12 h-8 rounded shadow-md"></div>
						</div>

						<div className="space-y-4">
							<div
								class="text-xl font-mono tracking-wider font-bold"
							>
								9860 0101 3465 0976
							</div>

							<div class="flex justify-between items-end">
								<div class="flex-1">
									<div
										class="text-xs opacity-70 uppercase font-medium"
									>
										Card Holder
									</div>
									<div class="font-bold text-sm">
										I. Yo'ldoshev
									</div>
								</div>
								<div class="flex-1 flex justify-end">ஃ</div>
							</div>
						</div>
					</Card>
				</div>
			</div>

			<Separator />
			<p class="text-xl font-bold">Karta orqali to'lov qilish:</p>
			<span class="font-bold font-mono">9860 0101 3465 0976</span>
			<span class="text-sm">(I. Yo'ldashev)</span>
			<span>
				Chekni
				<a
					class="font-bold text-blue-500"
					href="https://t.me/astron_corp"
					>@astron_corp</a
				>
				ga yuboring.
			</span>
		</div>
	</div>
</template>
