# Component

A simple abstract class to create web compenent.

```html
<body>
    <list-exemple></list-exemple>
</body>
<script src="../dist/component.umd.js"></script>
<script src="main.js"></script>
```

```js
window.onload = function(){
    class List extends component
    {
        constructor()
        {
            super();
        }

        setProperties()
        {
            this.props = this.observe({
                counter: 1
            })
        }

        initEventListener()
        {
            this.wrapper.querySelector('#add').addEventListener('click',()=>{
                this.props.counter ++;
            })
        }

        renderHtml()
        {
            return `
                <div class="list">
                    <button id="add">+</button>
                    <div id="counter">${this.props.counter}</div>
                </div>
            `;        
        }

        renderStyle()
        {
            return `

                .list{
                    display: flex;
                }
            `;
        }
    }

    customElements.define('list-exemple', List);
}
```