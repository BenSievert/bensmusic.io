// You can also use the generator at https://skeleton.dev/docs/generator to create these values for you
import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';
export const default_theme: CustomThemeConfig = {
	name: 'default_theme',
	properties: {
		// =~= Theme Properties =~=
		"--theme-font-family-base": `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		"--theme-font-family-heading": `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		"--theme-font-color-base": "0 0 0",
		"--theme-font-color-dark": "255 255 255",
		"--theme-rounded-base": "24px",
		"--theme-rounded-container": "8px",
		"--theme-border-base": "1px",
		// =~= Theme On-X Colors =~=
		"--on-primary": "0 0 0",
		"--on-secondary": "0 0 0",
		"--on-tertiary": "0 0 0",
		"--on-success": "0 0 0",
		"--on-warning": "255 255 255",
		"--on-error": "255 255 255",
		"--on-surface": "0 0 0",
		// =~= Theme Colors  =~=
		// primary | #cf90f9
		"--color-primary-50": "248 238 254", // #f8eefe
		"--color-primary-100": "245 233 254", // #f5e9fe
		"--color-primary-200": "243 227 254", // #f3e3fe
		"--color-primary-300": "236 211 253", // #ecd3fd
		"--color-primary-400": "221 177 251", // #ddb1fb
		"--color-primary-500": "207 144 249", // #cf90f9
		"--color-primary-600": "186 130 224", // #ba82e0
		"--color-primary-700": "155 108 187", // #9b6cbb
		"--color-primary-800": "124 86 149", // #7c5695
		"--color-primary-900": "101 71 122", // #65477a
		// secondary | #dda9ad
		"--color-secondary-50": "250 242 243", // #faf2f3
		"--color-secondary-100": "248 238 239", // #f8eeef
		"--color-secondary-200": "247 234 235", // #f7eaeb
		"--color-secondary-300": "241 221 222", // #f1ddde
		"--color-secondary-400": "231 195 198", // #e7c3c6
		"--color-secondary-500": "221 169 173", // #dda9ad
		"--color-secondary-600": "199 152 156", // #c7989c
		"--color-secondary-700": "166 127 130", // #a67f82
		"--color-secondary-800": "133 101 104", // #856568
		"--color-secondary-900": "108 83 85", // #6c5355
		// tertiary | #ff5500
		"--color-tertiary-50": "255 230 217", // #ffe6d9
		"--color-tertiary-100": "255 221 204", // #ffddcc
		"--color-tertiary-200": "255 213 191", // #ffd5bf
		"--color-tertiary-300": "255 187 153", // #ffbb99
		"--color-tertiary-400": "255 136 77", // #ff884d
		"--color-tertiary-500": "255 85 0", // #ff5500
		"--color-tertiary-600": "230 77 0", // #e64d00
		"--color-tertiary-700": "191 64 0", // #bf4000
		"--color-tertiary-800": "153 51 0", // #993300
		"--color-tertiary-900": "125 42 0", // #7d2a00
		// success | #24cef3
		"--color-success-50": "222 248 253", // #def8fd
		"--color-success-100": "211 245 253", // #d3f5fd
		"--color-success-200": "200 243 252", // #c8f3fc
		"--color-success-300": "167 235 250", // #a7ebfa
		"--color-success-400": "102 221 247", // #66ddf7
		"--color-success-500": "36 206 243", // #24cef3
		"--color-success-600": "32 185 219", // #20b9db
		"--color-success-700": "27 155 182", // #1b9bb6
		"--color-success-800": "22 124 146", // #167c92
		"--color-success-900": "18 101 119", // #126577
		// warning | #004bbd
		"--color-warning-50": "217 228 245", // #d9e4f5
		"--color-warning-100": "204 219 242", // #ccdbf2
		"--color-warning-200": "191 210 239", // #bfd2ef
		"--color-warning-300": "153 183 229", // #99b7e5
		"--color-warning-400": "77 129 209", // #4d81d1
		"--color-warning-500": "0 75 189", // #004bbd
		"--color-warning-600": "0 68 170", // #0044aa
		"--color-warning-700": "0 56 142", // #00388e
		"--color-warning-800": "0 45 113", // #002d71
		"--color-warning-900": "0 37 93", // #00255d
		// error | #97165e
		"--color-error-50": "239 220 231", // #efdce7
		"--color-error-100": "234 208 223", // #ead0df
		"--color-error-200": "229 197 215", // #e5c5d7
		"--color-error-300": "213 162 191", // #d5a2bf
		"--color-error-400": "182 92 142", // #b65c8e
		"--color-error-500": "151 22 94", // #97165e
		"--color-error-600": "136 20 85", // #881455
		"--color-error-700": "113 17 71", // #711147
		"--color-error-800": "91 13 56", // #5b0d38
		"--color-error-900": "74 11 46", // #4a0b2e
		// surface | #479dff
		"--color-surface-50": "227 240 255", // #e3f0ff
		"--color-surface-100": "218 235 255", // #daebff
		"--color-surface-200": "209 231 255", // #d1e7ff
		"--color-surface-300": "181 216 255", // #b5d8ff
		"--color-surface-400": "126 186 255", // #7ebaff
		"--color-surface-500": "71 157 255", // #479dff
		"--color-surface-600": "64 141 230", // #408de6
		"--color-surface-700": "53 118 191", // #3576bf
		"--color-surface-800": "43 94 153", // #2b5e99
		"--color-surface-900": "35 77 125", // #234d7d
	}
}