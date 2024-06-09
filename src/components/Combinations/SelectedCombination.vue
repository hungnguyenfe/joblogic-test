<script lang="ts" setup>
import CombinationColor from './CombinationColor.vue'
import { computed, ref, watch } from 'vue'
import { Combination } from '../../types'
import { useCombinationStore } from '../../store/combinations.ts'

const img = ref<string>()
const combinationStore = useCombinationStore()
const combinationDetail = computed(() => combinationStore.selected)

async function loadImage(
	combination: Combination
): Promise<string | undefined> {
	try {
		return await fetch(
			`../src/assets/images/thumbnail/${combination.combination.featuredImage.url}`
		)
			.then((res) => res.blob())
			.then((res) => URL.createObjectURL(res))
	} catch {
		return undefined
	}
}

watch(
	combinationDetail,
	async (newCombination) => {
		img.value = newCombination ? await loadImage(newCombination) : undefined
	},
	{
		immediate: true
	}
)
</script>

<template>
	<div>
		<div class="relative bg-cover overflow-hidden rounded-t-md">
			<div
				class="absolute right-5 top-5 flex items-center gap-2 bg-white shadow-md p-2 rounded cursor-pointer hover:opacity-80">
				<span
					v-if="combinationDetail?.combination.liked"
					class="material-icons text-red-500">
					favorite
				</span>
				<span v-else class="material-icons"> favorite_border </span>
				<span>{{ combinationDetail?.combination.likes }}</span>
			</div>
			<img
				:src="img"
				:alt="combinationDetail?.combination.featuredImage.alt"
				class="w-full h-auto" />
		</div>
		<div class="flex rounded-b-md overflow-hidden">
			<CombinationColor
				mode="color"
				class="flex-1"
				v-for="(color, index) of combinationDetail?.combination.colors ?? []"
				:key="index"
				:color="color" />
		</div>
		<div class="flex overflow-hidden">
			<CombinationColor
				mode="text"
				class="flex-1"
				v-for="(color, index) of combinationDetail?.combination.colors ?? []"
				:key="index"
				:color="color"
				@update-color="
					($event) => {
						combinationStore.updateCombinationColor(index, $event)
					}
				" />
		</div>
	</div>
</template>
