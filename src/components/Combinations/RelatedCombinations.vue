<script lang="ts" setup>
import { useCombinationStore } from '../../store/combinations.ts'

const combinationStore = useCombinationStore()

function handleSetCombination(id: number) {
	try {
		combinationStore.setSelectedCombination(id)
	} catch (error) {
		alert(error)
	}
}
</script>

<template>
	<div class="flex flex-col gap-5">
		<h3 class="text-2xl font-bold">Related Combinations</h3>

		<div class="grid md:grid-cols-2 grid-cols-1 gap-5">
			<div
				v-for="(combination, index) of combinationStore.getRelatedCombinations"
				:key="combination.id"
				:class="[
					'flex justify-center',
					index % 2 ? 'md:justify-start' : 'md:justify-end'
				]">
				<div
					class="flex rounded hover:shadow-md cursor-pointer transition duration-300 ease-in-out"
					@click="handleSetCombination(combination.id)">
					<div
						v-for="(color, index) of combination.colors"
						:key="index"
						:style="{ backgroundColor: color }"
						class="w-related-combination-color h-related-combination-color"></div>
				</div>
			</div>

			<div
				v-if="combinationStore.hasMoreRelatedCombinations"
				class="flex md:justify-start justify-center"
				@click="combinationStore.loadMoreRelatedCombinations()">
				<button class="bg-gray-200 rounded h-[80px] w-[320px] text-center p-2">
					See more combinations
				</button>
			</div>
		</div>
	</div>
</template>
