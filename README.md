# elementCreator
Simple one function module helps you create an HTMLDivElement and appends its child node.

Function `elementCreator` returns HTMLDivElement that has class or classes passing in first argument
and that is parent to elements passing in second argument.

Throws Error if first argument isn't string or array of strings and second argument isn't array of strings 
and/or callbacks returning HTMLElement
## usage

Add package to your modules' folder and import `elementCreator` function

```
import { elementCreator } from "./modules/elementCreator";
```
```
const { elementCreator } = require("./modules/elementCreator");
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
