const {elementCreator} = require("../lib/module.js")
const {window, document} = require("./DOM.mjs")

describe('Main Test: elementCreator:', () => {
	let HTMLElement,
		HTMLDivElement,

		num,
		str,
		undf,
		bool,
		bint,
		symb,
		nll,
		obj,

		strArr,
		mixArr,
		HTMLArr,
		strHTMLArr,
		strHTMLnotHTMLArr,

		HTMLElementCB,
		strCB

	beforeAll(() => {
		HTMLElement = window.HTMLElement
		HTMLDivElement = window.HTMLDivElement
	})
	beforeEach(() => {
		num = 12
		str = "string"
		undf = undefined
		bool = true
		bint = BigInt(12)
		symb = Symbol("s")
		nll = null
		obj = new Object()

		HTMLElementCB = () => {
			let el = document.createElement('div')
			return el
		}
		strCB = () => "str"

		strArr = ["str", "ing"]
		mixArr = ["str", 12, false]
		HTMLArr = [HTMLElementCB, HTMLElementCB]
		strHTMLArr = ["str", HTMLElementCB]
		strHTMLnotHTMLArr = ["str", HTMLElementCB, strCB]

	})

	test('should be defined', () => {
		expect(elementCreator).toBeDefined()
	})
	test('should returns an HTMLElement', () => {
		expect(elementCreator("className")).toBeInstanceOf(HTMLElement)
	})

	test('should take a string as the first parameter', () => {
		expect(() => elementCreator(str)).not.toThrowError();
	 })
	test('should take a Array of string as the first parameter', () => {
		expect(() => elementCreator(strArr)).not.toThrowError();
	})
	test('should throw error if the first parameter has wrong type', () => {
		expect(() => elementCreator(num)).toThrowError();
		expect(() => elementCreator(undf)).toThrowError();
		expect(() => elementCreator(bool)).toThrowError();
		expect(() => elementCreator(bint)).toThrowError();
		expect(() => elementCreator(symb)).toThrowError();
		expect(() => elementCreator(nll)).toThrowError();
		expect(() => elementCreator(obj)).toThrowError();
		expect(() => elementCreator(mixArr)).toThrowError();
	 })

	test('should not throw error if the second parameter is undefined', () => {
		expect(()=>{elementCreator(str, undf)}).not.toThrowError();
	})
	test('should take an array of string as the second parameter', () => {
		expect(()=>{elementCreator(str, strArr)}).not.toThrowError();
	})
	test('should take an array of callback as the second parameter', () => {
		expect(()=>{elementCreator(str, HTMLArr)}).not.toThrowError();
	})
	test('should take an array of callback and string as the second parameter', () => {
		expect(()=>{elementCreator(str, strHTMLArr)}).not.toThrowError();
	})
	test('should throw error if the second parameter has wrong type', () => {
		expect(() => elementCreator(str, num)).toThrowError();
		expect(() => elementCreator(str, str)).toThrowError();
		expect(() => elementCreator(str, bool)).toThrowError();
		expect(() => elementCreator(str, bint)).toThrowError();
		expect(() => elementCreator(str, symb)).toThrowError();
		expect(() => elementCreator(str, nll)).toThrowError();
		expect(() => elementCreator(str, obj)).toThrowError();
		expect(() => elementCreator(str, mixArr)).toThrowError();
	 })
	test('should throw an error if one of the callbacks in the array of the second parameter returns a non-HTMLElement', () => {
		expect(() => elementCreator(str, strHTMLnotHTMLArr)).toThrowError();
	})
 })

 describe('Return test: return of elementCreator:', () => {
	let	className,
		classNameArr,

		strArr,
		mixArr,
		HTMLArr,
		strHTMLArr,
		strHTMLnotHTMLArr,

		HTMLElementCB,
		strCB


	beforeAll(()=>{
		className = "classA";
		classNameArr = ["classA", "classB"]

		HTMLElementCB = () => {
			let el = document.createElement('div')
			return el
		}
		strCB = () => "str"

		strArr = ["str", "ing"]
		mixArr = ["str", 12, false]
		HTMLArr = [HTMLElementCB, HTMLElementCB]
		strHTMLArr = ["str", HTMLElementCB]
		strHTMLnotHTMLArr = ["str", HTMLElementCB, strCB]


	})
	test('should have correct class names', () => {
		expect(elementCreator(className).classList.contains(className)).toBe(true);
		expect(elementCreator(classNameArr).classList.contains(classNameArr[0])).toBe(true);
		expect(elementCreator(classNameArr).classList.contains(classNameArr[1])).toBe(true);
	})
	test('should contain the correct number of child nodes', () => {
		expect(elementCreator(className, strArr).childNodes.length).toBe(strArr.length);
		expect(elementCreator(className, strHTMLArr).childNodes.length).toBe(strHTMLArr.length);
		expect(elementCreator(className, strHTMLArr).childNodes.length).toBe(HTMLArr.length);

	})
	test('should be the parent for all node transmitted in the second argument', () => {
		let el1 = document.createElement('div')
		let el2 = document.createElement('div')
		let parent = elementCreator("parent", [()=>el1, ()=>el2])
		expect(el1.parentElement).toBe(parent);
		expect(el2.parentElement).toBe(parent);
	 })
	test('should contain all text transmitted in the second argument', () => {
		let str1 = "hello"
		let str2 = "world"
		let parent = elementCreator("parent", [str1, str2])
		expect(parent.innerHTML).toBe(str1+str2);
	 })

  })
