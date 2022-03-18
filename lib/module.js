//Connects `window` and `document` from the `DOM`, which is used for testing
// const {window, document} = require("../tests/DOM")


/**
 * Throws TypeError if at least one of the parameters has the wrong type
 * @param {any} arg1
 * @param {any} arg2
 */
 const checker = (arg1, arg2) => {
	const ARG1WRONGTYPE = new TypeError("the first parameter must be a string or an array of strings")
	const ARG2WRONGTYPE = new TypeError("the second parameter must be an array of callbacks and/or strings")
	const ARG2ELEMENTWRONGRETURN = new TypeError("the callback in second argument must return HTMLElement")

	if (typeof arg1 !== "string" && !(Array.isArray(arg1)))
		throw ARG1WRONGTYPE
	if (Array.isArray(arg1)){
		arg1.forEach(el => {
			if (typeof el !== "string")
				throw ARG1WRONGTYPE
		})
	}

	if (!(Array.isArray(arg2)) && arg2 !== undefined)
		throw ARG2WRONGTYPE
	if (Array.isArray(arg2)){
		arg2.forEach(el => {
			if (typeof el !== "string" && typeof el !== "function")
				throw ARG2WRONGTYPE
			if (typeof el === "function" && !(el() instanceof window.HTMLElement))
				throw ARG2ELEMENTWRONGRETURN
		})
	}
}


/**
 * Returns an HTML Div element that has class or classes passing in first argument
 * and that is parent to elements passing in second argument
 *
 * Each element in the array of the second argument must be a callback that
 * returns an HTML element, else it will be handled as a string
 * @param {String | Array<String>} name Class name or array
 * of class names
 * @param {Array<String | ()=> HTMLElement>} children Array of a strings or
 * functions that returns an HTML element
 * @returns {HTMLDivElement}
 */
const elementCreator = (name, children = []) => {
	checker(name, children)
	const element = document.createElement('div')
	if (typeof name === "string")
		element.classList.add(name)
	else
		element.classList.add(...name)
	children.forEach(node => {
		node = typeof node === "string" ? document.createTextNode(node) : node()
		element.appendChild(node)
	});
	return element
}

module.exports = {elementCreator}
