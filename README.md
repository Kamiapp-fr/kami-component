# `kami-component`

A simple abstract class to create web compenent.
This lib is a simple helper to create web component.

* [Getting Started](#getting-started)
    * [ES6](#es6)
    * [UMD](#umd)
* [Life Hook](#life-hook)
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

> See **counter example**.


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
  <img  src="https://raw.githubusercontent.com/Kamiapp-fr/kami-component/master/.github/LifeHook.png">
</p>

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