# elementCreator
Simple one function module helps you create an HTMLDivElement and appends its child node.

Function `elementCreator` returns HTMLDivElement that has class or classes passing in first argument
and that is parent to elements passing in second argument.

Throws Error if first argument isn't string or array of strings and second argument isn't array of strings 
and/or callbacks returning HTMLElement

## installing

```
npm install git+https://github.com/adustin21/elementCreator.git
```

## usage

By default, the module is imported as an es6 module:

```
import { elementCreator } from "@adustin21/elementcreator";
```
If you need CommonJS module use:
```
const { elementCreator } = require("@adustin21/elementcreator/module");
```
also
```
import { elementCreator } from "@adustin21/elementcreator/module";
```

## example

```
import { elementCreator } from "./element";

const article = (title, text) => {
  const element = elementCreator(["article", "hot"], [
    () => elementCreator("title", [title.toUpperCase()]),
    text
  ]);
  return element;
};

const title = "Title";
const text = "Lorem ipsum dolor sit amet";

console.log(article(title, text));
```

```
//output
<div class="article hot">
  <div class="title">TITLE</div>
  Lorem ipsum dolor sit amet
</div>
```
