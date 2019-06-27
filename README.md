# kami-component

A simple abstract class to create web compenent.
This lib is a simple helper to create web component.

## Getting Started

>Into the getting started, you will see the code of a counter component.

<p align="center">
  <img  src="https://raw.githubusercontent.com/EmilienLeroy/kami-component/master/example/counter.gif">
</p>

### ES6

Install the lib from *npm*.

```
npm install --save kami-component
```

After just import it and extend your class with this.


> Counter.js
```js
import KamiComponent from 'kami-component'

//a simple counter
class Counter extends KamiComponent
    {
        constructor()
        {
            super();
        }

        //set your properties to the parent
        //necessary for the render() method
        setProperties()
        {
            this.props = this.observe({
                counter: 1
            })
        }

        //init all your event listener
        initEventListener()
        {
            this.wrapper.querySelector('#add').addEventListener('click',()=>{
                this.props.counter ++;
            })

            this.wrapper.querySelector('#remove').addEventListener('click',()=>{
                this.props.counter --;
            })
        }

        //render the dom structure
        renderHtml()
        {
            return `
                <div class="counter">
                    <button class="counter__btn" id="add">+</button>
                    <button class="counter__btn" id="remove">-</button>
                    <div class="counter__text" id="counter">${this.props.counter}</div>
                </div>
            `;        
        }

        //render the style component
        renderStyle()
        {
            return `

                .counter{
                    display: flex;
                    width: 100%;
                    height: 100vh;
                    justify-content: center;
                    align-items: center;
                }

                .counter__btn{
                    margin: 5px;
                    padding: 10px;
                }

                .counter__text{
                    font-size: 30px;
                    font-family: sans-serif;
                    margin: 10px;
                }
            `;
        }
    }

```

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
    <list-exemple></list-exemple>
</body>
<script src="../dist/KamiComponent.umd.js"></script>
<script src="main.js"></script>
```

>main.js
```js
window.onload = function(){
    //a simple counter
    class Counter extends KamiComponent
    {
        constructor()
        {
            super();
        }

        //set your properties to the parent
        //necessary for the render() method
        setProperties()
        {
            this.props = this.observe({
                counter: 1
            })
        }

        //init all your event listener
        initEventListener()
        {
            this.wrapper.querySelector('#add').addEventListener('click',()=>{
                this.props.counter ++;
            })

            this.wrapper.querySelector('#remove').addEventListener('click',()=>{
                this.props.counter --;
            })
        }

        //render the dom structure
        renderHtml()
        {
            return `
                <div class="counter">
                    <button class="counter__btn" id="add">+</button>
                    <button class="counter__btn" id="remove">-</button>
                    <div class="counter__text" id="counter">${this.props.counter}</div>
                </div>
            `;        
        }

        //render the style component
        renderStyle()
        {
            return `

                .counter{
                    display: flex;
                    width: 100%;
                    height: 100vh;
                    justify-content: center;
                    align-items: center;
                }

                .counter__btn{
                    margin: 5px;
                    padding: 10px;
                }

                .counter__text{
                    font-size: 30px;
                    font-family: sans-serif;
                    margin: 10px;
                }
            `;
        }
    }

    //declare your web component
    customElements.define('counter-exemple', Counter);
}
```