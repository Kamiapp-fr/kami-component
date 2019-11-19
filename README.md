# `kami-component`

A simple abstract class to create web compenent.
This lib is a simple helper to create web component.

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
  <img  src="https://raw.githubusercontent.com/Kamiapp-fr/kami-component/master/.github/lifecycle.png">
</p>


## Contribute

We would love you for the contribution to ``kami-component`` project, check the ``CONTRIBUTING`` file for more info.