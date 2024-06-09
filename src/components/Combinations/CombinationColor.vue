<script lang="ts" setup>
import { Color } from '../../types'
import { ref } from 'vue'

defineProps<{ color: Color; mode: 'color' | 'text' }>()
const emits = defineEmits<{
	(name: 'updateColor', color: string): void
}>()

const inputColor = ref<HTMLInputElement>()
const isCopied = ref(false)

function copyToClipboard(text: string) {
	!isCopied.value &&
		navigator.clipboard.writeText(text).then(
			() => {
				isCopied.value = true
				setTimeout(() => {
					isCopied.value = false
				}, 500)
			},
			(err) => {
				console.error(err)
				alert('Copying to clipboard failed!')
			}
		)
}

function handleInputColorEvent(e: Event) {
	const target = e.target as HTMLInputElement
	target && emits('updateColor', target.value)
}
</script>

<template>
	<div
		v-if="mode === 'color'"
		class="group relative h-combination-color cursor-pointer">
		<div class="w-full h-full" :style="{ backgroundColor: color.hex }"></div>
		<div
			class="z-10 opacity-0 absolute inset-0 duration-300 bg-black bg-opacity-50 group-hover:opacity-100 flex justify-center items-center text-white"
			@click="copyToClipboard(color.hex)">
			<Transition mode="out-in" name="fade">
				<span v-if="isCopied" class="material-icons"> check </span>
				<span v-else>Copy</span>
			</Transition>
		</div>
	</div>
	<div
		v-else
		class="flex flex-col h-combination-color justify-center items-center relative">
		<span class="underline">{{ color.name }}</span>
		<div
			class="cursor-pointer text-gray-400 hover:border-black border border-transparent"
			@click="
				() => {
					inputColor?.click()
				}
			">
			{{ color.hex }}
		</div>
		<input
			class="opacity-0 absolute bottom-5 -z-10"
			ref="inputColor"
			type="color"
			:value="color.hex"
			@input="handleInputColorEvent" />
	</div>
</template>
