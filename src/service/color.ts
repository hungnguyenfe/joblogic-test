export class ColorService {
	private static _instance: ColorService = new ColorService()

	private constructor() {}

	public static get instance(): ColorService {
		return this._instance
	}

	convertHexToRgb(hex: string): string {
		if ((hex.length !== 4 && hex.length !== 7) || !hex.startsWith('#'))
			throw 'Invalid hex code.'

		let hexCode = hex.replace('#', '')
		if (hexCode.length === 3) {
			hexCode = hexCode
				.split('')
				.map((char) => char + char)
				.join('')
		}

		const r = parseInt(hexCode.substring(0, 2), 16)
		const g = parseInt(hexCode.substring(2, 4), 16)
		const b = parseInt(hexCode.substring(4, 6), 16)
		return `rgb(${r}, ${g}, ${b})`
	}

	// Follow algorithm via: http://www.w3.org/TR/AERT#color-contrast
	getContrastColor(hex: string): '#fff' | '#000' {
		const rgbValues = this.convertHexToRgb(hex)
			.replace('rgb(', '')
			.replace(')', '')
			.split(',')
			.map((v) => parseInt(v.trim()))
		const brightness = Math.round(
			(rgbValues[0] * 299 + rgbValues[1] * 587 + rgbValues[2] * 114) / 1000
		)
		return brightness > 125 ? '#000' : '#fff'
	}
}
