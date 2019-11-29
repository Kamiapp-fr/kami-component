# `kami-component`

A simple abstract class to create web compenent.
This lib is a simple helper to create web component.

* [Getting Started](#getting-started)
    * [ES6](#es6)
    * [UMD](#umd)
* [Life Hook](#life-hook)
  * [Set Properties](#set-properties)
  * [Render Html](#render-html)
  * [Render Style](#render-style)
  * [Template Binding](#template-binding)
* [Contribute](#contribute)

## Getting Started

>Into the getting started, you will see the code of a counter component.

<p align="center">
  <img  src="https://emilienleroy.fr/assets/counter.gif">
</p>

### ES6

Install the lib from *npm*.

```
npm install --save kami-component
```

After just import it and extend your class with this.

> See **[counter example](https://github.com/Kamiapp-fr/kami-component/tree/master/example/counter)**.


To declare you component, just import your component into your *index.js* file and use the *customElements.define()* methode. See the example bellow.

>index.js
```js
import Counter from "./Counter";

//declare your web component
window.customElements.define('counter-example', Counter);
```


### UMD

In first you should get the lib from the */dist* folder. 
After add this file into your html with a script dom.
And just extend your component with this class.
At the end of your js you need to declare your component with the *customElements.define()* methode.
See the example bellow. 

>index.html
```html
<body>
    <counter-exemple></counter-exemple>
</body>
<script src="../dist/KamiComponent.umd.js"></script>
<script src="main.js"></script>
```

## Life Hook

> This is a diagram for the kami-component life cycle.

<p align="center">
  <img  src="https://lh5.googleusercontent.com/hlDJbaYrB0ZVRyz5oXOzfFLtpJ4BX8vkO8kwTnnxkL8iCycQy_X8JHOlNVzs9xqGXctI409Wc5ehKMnmMzlr=w2560-h1262-rw">
</p>

### Set Properties

The `setProperties()` is the first method called. It's here you will get props from your component. You need to override this method to init your props.

This is an example :
```js
//drawing.js
setProperties() {
  this.color = this.getAttribute('color') || 'black';
}
```
and the *html* part : 
```html
<drawing-exemple color="green"></drawing-exemple>
```

You can also use reactive props. To use this you need to use `this.props` property and the `observe()` method. With this when a data from `this.props` is update, the component will re-render the template part.

This is a reactive example :
```js
// you need to observe your attribute to use reactive
static get observedAttributes() {return ['counter']; }

// init reactive props
setProperties() {
  this.props = this.observe({
    counter: parseInt(this.getAtribute('counter')) | 1
  })
}

// after just display your data like this.
renderHtml() {
  return `
    <div class="counter">
      ${this.props.counter}
    </div>
  `;        
}

```
and the *html* part : 
```html
<drawing-exemple counter="0"></drawing-exemple>
```
> See [drawing example](https://github.com/Kamiapp-fr/kami-component/tree/master/example/drawing) for simple props and [counter example](https://github.com/Kamiapp-fr/kami-component/tree/master/example/counter) for reactive props. 

### Render Html

### Render Style

### Template binding

With KamiComponent you can directly bind your event listener into your template.
To work you juste need to add into a dom the `bind:<type>` attribute. You can replace the type part by every listener type you want like *click* or *mouseover*. 

This is an example :

```js
/**
 * ... more code
 */

// update the current counter number
updateCounter(to) {
  this.props.counter = this.props.counter + parseInt(to);
  this.setUrlParam('counter',this.props.counter);
  return this;
}

// Listener add directly from the template. 
renderHtml() {
  return `
    <div class="counter">
      <button 
        id="add"
        class="counter__btn" 
        bind:click="updateCounter(1);" 
      >+</button>
      <button 
        id="remove"
        class="counter__btn"
        bind:click="updateCounter(-1)"  
      >-</button>
      <div class="counter__text" id="counter">${this.props.counter}</div>
    </div>
  `;        
}
```

In this example when you *click* on a button the `updateCounter()` will be call. This is due at this attribute `bind:click="updateCounter(-1)"` which will add the click event listener.

If you want get the event emit you just need to update your method like this :
```js

updateCounter(to, event) {
  event.preventDefault() // this is just an example
}

```

Event emit is always add in last params when the listener is fire.

> To see more example, go into the **example folder** of this repository.

## Contribute

We would love you for the contribution to ``kami-component`` project, check the ``CONTRIBUTING`` file for more info.