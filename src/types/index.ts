export type Color = {
	slug: string
	hex: string
	name: string
}

export type FeaturedImage = {
	alt: string
	url: string
}

export type CombinationDetail = {
	liked: boolean
	id: number
	slug: string
	color: Color
	featuredImage: FeaturedImage
	name: string
	likes: number
	colors: Color[]
}

type RelatedCombinationDetail = {
	id: number
	name: string
	slug: string
	colors: string[]
	likes: number
	liked: boolean
}

export type Combination = {
	combination: CombinationDetail
	relatedCombinations: Array<RelatedCombinationDetail>
}

export type ListCombination = {
	combinations: Array<Combination>
}
