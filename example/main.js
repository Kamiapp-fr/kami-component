window.onload = function(){
    class Counter extends KamiComponent
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

            this.wrapper.querySelector('#remove').addEventListener('click',()=>{
                this.props.counter --;
            })
        }

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

    customElements.define('counter-exemple', Counter);
}