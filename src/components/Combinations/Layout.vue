<script lang="ts" setup>
import { computed, onBeforeMount } from 'vue'
import SelectedCombination from './SelectedCombination.vue'
import RelatedCombinations from './RelatedCombinations.vue'
import BrowseTemplates from './BrowseTemplates.vue'
import { ColorService } from '../../service/color.ts'
import { useCombinationStore } from '../../store/combinations.ts'

const combinationStore = useCombinationStore()
const bgCover = computed(() => combinationStore.selected?.combination.color.hex)
const contrastColor = computed(() => {
	if (combinationStore.selected) {
		const color = combinationStore.selected?.combination.color ?? ''
		try {
			return ColorService.instance.getContrastColor(color.hex)
		} catch (err) {
			return '#000'
		}
	}
})

onBeforeMount(() => combinationStore.loadCombinationsAndSetDefault())
</script>

<template>
	<template v-if="combinationStore.isLoading">
		<div class="w-screen h-screen flex justify-center items-center relative">
			<span class="spinner"></span>
		</div>
	</template>

	<template v-else>
		<div>
			<div
				class="h-cover absolute left-0 right-0 top-0"
				:style="{
					backgroundColor: bgCover
				}">
				<div class="waves-cover w-full h-full rotate-180 bg-no-repeat"></div>
			</div>

			<div class="max-w-container mx-auto flex flex-col gap-10 py-6">
				<div class="flex w-full mb-10">
					<div class="w-full text-center relative z-10">
						<ul class="flex justify-center gap-2 mb-10 list">
							<li class="text-gray-600">Colors</li>
							<li class="text-gray-600">Color Palettes</li>
							<li class="text-gray-500">Pastel Blonde</li>
						</ul>
						<h1
							class="font-bold text-3xl max-w-title mx-auto"
							:style="{ color: contrastColor }">
							Pastel Blonde color combination
						</h1>
					</div>
				</div>

				<div class="text-center">
					<SelectedCombination />
				</div>

				<div class="text-center">
					<RelatedCombinations />
				</div>

				<div class="text-center">
					<BrowseTemplates />
				</div>
			</div>
		</div>
	</template>
</template>

<style scoped>
.waves-cover {
	transform: rotateY(180deg);
	background-color: v-bind(bgCover);
	background-image: url('../../assets/images/assets/foreground.png');
	background-size: 200% 100%;
	background-position: 0 0%;
}

.list li:not(:last-child)::after {
	margin-left: 0.5rem;
	content: '\e5cc';
	font-family: 'Material Icons';
	display: inline-block;
	vertical-align: middle;
}
</style>
