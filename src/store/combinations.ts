import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { ListCombination } from '../types'

export const useCombinationStore = defineStore('combinations', () => {
	const isLoading = ref(false)
	const list = ref<ListCombination>({ combinations: [] })
	const selectedIndex = ref<number>(0)
	const relatedPage = ref(0)
	const relatedPerPage = ref(5)

	const selected = computed(() => list.value.combinations[selectedIndex.value])

	const countCurrentRelatedCombinations = computed(() => {
		return Math.min(
			(relatedPage.value + 1) * relatedPerPage.value,
			selected.value?.relatedCombinations.length ?? 0
		)
	})

	const hasMoreRelatedCombinations = computed(
		() =>
			countCurrentRelatedCombinations.value <
			(selected.value?.relatedCombinations.length ?? 0)
	)

	const getRelatedCombinations = computed(() => {
		return (
			selected.value?.relatedCombinations.slice(
				0,
				countCurrentRelatedCombinations.value
			) ?? []
		)
	})

	const loadMoreRelatedCombinations = () => {
		hasMoreRelatedCombinations.value && relatedPage.value++
	}

	const resetRelatedCombinations = () => {
		relatedPage.value = 0
	}

	const loadCombinationsAndSetDefault = async () => {
		try {
			isLoading.value = true
			const response = await fetch(
				'../src/assets/jsons/combinations/combinations.json'
			).then((res) => res.json() as Promise<ListCombination>)
			list.value = response
		} catch {
			list.value = { combinations: [] }
		} finally {
			isLoading.value = false
		}
	}

	const setSelectedCombination = (id: number) => {
		const combinationIndex = list.value.combinations.findIndex(
			(c) => c.combination.id === id
		)
		if (combinationIndex === -1) throw 'Cannot find combination.'
		selectedIndex.value = combinationIndex
	}

	const updateCombinationColor = (index: number, color: string) => {
		if (list.value.combinations[selectedIndex.value] && color)
			list.value.combinations[selectedIndex.value].combination.colors[
				index
			].hex = color
	}

	return {
		isLoading,
		selected,
		relatedPage,
		countCurrentRelatedCombinations,
		getRelatedCombinations,
		hasMoreRelatedCombinations,
		resetRelatedCombinations,
		loadMoreRelatedCombinations,
		loadCombinationsAndSetDefault,
		setSelectedCombination,
		updateCombinationColor
	}
})
