
import {Suite, expect} from "cynic"

import {camelCss, css} from "./camel-css.js"
import {compile} from "./compilation/compile.js"
import {Token} from "./parsing/ordinary/types.js"
import {parse} from "./parsing/ordinary/parse.js"
import {tokenize} from "./parsing/ordinary/tokenize.js"

/*

SEE MDN CSS REFERENCE https://developer.mozilla.org/en-US/docs/Web/CSS/Syntax

TODO features
- slash-star comments (that remain in the css output)
- child selectors with commas: h1 {h2,h3 {}} -- compiles to `h1 :is(h2, h3)`
- strip off trailing commas at end of selectors (camel allows trailing commas, css does not)
- "^" caret parent reference feature (^:hover)
- fully featured
	- animations and keyframes and stuff like that
	- import statements
	- media queries
- injection safety

*/

export default <Suite>{
	"ordinary syntax": {
		"tokenize": {
			async "returns the correct number of tokens"() {
				const tokens = [...tokenize(`header { h1 { color: red; } }`)]
				expect(tokens.length).equals(6)
			},
			async "returns the correct tokens"() {
				const correctTokenTypes = [
					Token.Type.Open,
					Token.Type.Open,
					Token.Type.RuleName,
					Token.Type.RuleValue,
					Token.Type.Close,
					Token.Type.Close,
				]
				const tokens = [...tokenize(`header { h1 { color: red; } }`)]
				expect(tokens.length).equals(correctTokenTypes.length)
				const correct = correctTokenTypes
					.every((type, index) => tokens[index].type === type)
				expect(correct).ok()
			},
			async "returns good tokens for complex source"() {
				const tokens = [...tokenize(`
					header {
						background: yellow;
						h1 { color: red; }
					}
				`)]
				const correctTokenTypes = [
					Token.Type.Open,
					Token.Type.RuleName,
					Token.Type.RuleValue,
					Token.Type.Open,
					Token.Type.RuleName,
					Token.Type.RuleValue,
					Token.Type.Close,
					Token.Type.Close,
				]
				expect(tokens.length).equals(correctTokenTypes.length)
				const correct = correctTokenTypes
					.every((type, index) => tokens[index].type === type)
				expect(correct).ok()
			},
		},
		"parse": {
			async "flat source code into expressions"() {
				const tokens = tokenize(`
					h1 {
						color: red;
						text-align: center;
					}
					h2 {
						font-style: italic;
					}
				`)
				const expressions = [...parse(tokens)]
				expect(expressions.length).equals(2)
			},
			async "nested source code into nested expressions"() {
				const tokens = tokenize(`header { h1 { color: red; } }`)
				const expressions = [...parse(tokens)]
				expect(expressions.length).equals(1)
				{
					const [expression1] = expressions
					const [selector, rules, children] = expression1
					expect(selector).equals("header")
					expect(Object.keys(rules).length).equals(0)
					expect(children.length).equals(1)
					{
						const [child] = children
						const [selector, rules, children2] = child
						expect(selector).equals("h1")
						expect(Object.keys(rules).length).equals(1)
						expect(children2.length).equals(0)
					}
				}
			},
		},
		"compile": {
			async "nested source code emits proper css"() {
				const tokens = tokenize(`header { h1 { color: red; } }`)
				const expressions = parse(tokens)
				const css = [...compile(expressions)].join("")
				const expectedResult = `header h1 { color: red; }`
				expect(strip(css)).equals(strip(expectedResult))
			},
			async "parent expression can contain rules and children"() {
				const tokens = tokenize(`
					header {
						background: yellow;
						h1 { color: red; }
					}
				`)
				const expressions = parse(tokens)
				const cssBlocks = compile(expressions)
				const css = [...cssBlocks].join("")
				const expectedResult = `
					header { background: yellow; }
					header h1 { color: red; }
				`
				expect(strip(css)).equals(strip(expectedResult))
			},
			async "parent reference is properly replaced"() {
				const tokens = tokenize(`
					header {
						background: yellow;
						^:hover { color: red; }
					}
				`)
				const expressions = parse(tokens)
				const cssBlocks = compile(expressions)
				const css = [...cssBlocks].join("")
				const expectedResult = `
					header { background: yellow; }
					header:hover { color: red; }
				`
				expect(strip(css)).equals(strip(expectedResult))
			},
			async "slash-slash comments are stripped away from output"() {
				const result = strip(camelCss(`
					// my comment
					h1 { // lol1
						// another comment
						color: red;
						// yet another comment!
						background: linear-gradient(
							to bottom,
							magenta, // lol
							// rofl
							pink,
						);
					} // rofl2
					h2 // hello
					{ color: blue; }
				`))

				expect(result).equals(strip(`
					h1 {
						color: red;
						background: linear-gradient(
							to bottom,
							magenta,
							pink,
						);
					}
					h2 { color: blue; }
				`))
			},
			// async "slash-star comments remain in output"() {
			// 	expect(camelCss(strip(`
			// 		/* here is my comment that stays in the output */
			// 		h1 {
			// 			/*
			// 			these comments are multiline
			// 			*/
			// 			color: red;
			// 			background: linear-gradient(
			// 				/* lol */to /*hahah*/bottom,
			// 				magenta,
			// 				pink,
			// 			)/*rofl*/;
			// 		}
			// 		/*h2,*/
			// 		h3 { color: blue; }
			// 		h4,
			// 		/*h5,*/
			// 		h6 { color: skyblue; }
			// 		h7
			// 		/*h8*/ { color: lime; }
			// 	`))).equals(strip(`
			// 		h1 {
			// 			color: red;
			// 			background: linear-gradient(
			// 				to bottom,
			// 				magenta,
			// 				pink,
			// 			);
			// 		}
			// 		h3 { color: blue; }
			// 		h4,
			// 		h6 { color: skyblue; }
			// 		h7 { color: lime; }
			// 	`))
			// },
			// async "fully-featured snippet"() {
			// 	expect(strip(camelCss(`
			// 		@charset "utf-8";
			// 		@import url("narrow.css") supports(display: flex) screen and (max-width: 400px);

			// 		@font-face {
			// 			font-family: "Open Sans";
			// 			src: url("/fonts/OpenSans-Regular-webfont.woff2") format("woff2"),
			// 				url("/fonts/OpenSans-Regular-webfont.woff") format("woff");
			// 		}

			// 		@media screen and (min-width: 900px) {
			// 			article {
			// 				padding: 1rem 3rem;
			// 			}
			// 		}

			// 		@supports (display: flex) {
			// 			@media screen and (min-width: 900px) {
			// 				article {
			// 					display: flex;
			// 				}
			// 			}
			// 		}

			// 		@keyframes slidein {
			// 			from { transform: translateX(0%); }
			// 			to { transform: translateX(100%); }
			// 		}

			// 		// this comment disappears
			// 		/* this comment remains it the output */
			// 		h1 {
			// 			background: black;
			// 			em { color: yellow; }
			// 		}
			// 	`))).equals(strip(`
			// 		@charset "utf-8";
			// 		@import url("narrow.css") supports(display: flex) screen and (max-width: 400px);

			// 		@font-face {
			// 			font-family: "Open Sans";
			// 			src: url("/fonts/OpenSans-Regular-webfont.woff2") format("woff2"),
			// 				url("/fonts/OpenSans-Regular-webfont.woff") format("woff");
			// 		}

			// 		@media screen and (min-width: 900px) {
			// 			article {
			// 				padding: 1rem 3rem;
			// 			}
			// 		}

			// 		@supports (display: flex) {
			// 			@media screen and (min-width: 900px) {
			// 				article {
			// 					display: flex;
			// 				}
			// 			}
			// 		}

			// 		@keyframes slidein {
			// 			from { transform: translateX(0%); }
			// 			to { transform: translateX(100%); }
			// 		}

			// 		/* this comment remains it the output */
			// 		h1 { background: black; }
			// 		h1 em { color: yellow; }
			// 	`))
			// },
			// async "media query nesting"() {
			// 	expect(strip(camelCss(`
			// 		@media (min-width: 900px) {
			// 			article {
			// 				padding: 1rem 3rem;
			// 				h1 {
			// 					color: red;
			// 				}
			// 			}
			// 		}
			// 		header {
			// 			@media (max-width: 500px) {
			// 				h2 {
			// 					color: cyan;
			// 					em { color: green; }
			// 				}
			// 			}
			// 		}
			// 	`))).equals(strip(`
			// 		@media (min-width: 900px) {
			// 			article { padding: 1rem 3rem; }
			// 			article h1 { color: red; }
			// 		}
			// 		@media (max-width: 500px) {
			// 			header h2 { color: cyan; }
			// 			header h2 em { color: green; }
			// 		}
			// 	`))
			// },
		},
		"errors": {
			async "error should be thrown on missing close token"() {
				expect(() => camelCss(`h1 { color: red;`)).throws()
			},
		},
		"bugs": {
			async "fixed: missing semicolon gives blank output"() {
				expect(strip(css`h1 { color: red }`))
					.equals(strip(`h1 { color: red; }`))
			},
		},
	},
}

function strip(text: string) {
	return text.trim().replaceAll(/\s+/mg, " ")
}
