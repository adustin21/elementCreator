const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const window = new JSDOM().window
const document = window.document

module.exports = {window, document}
