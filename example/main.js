window.onload = function(){
    class Counter extends KamiComponent
    {
        constructor()
        {
            super();
        }

        static get tag(){
            return 'counter-exemple';
        }

        get add(){
            return this.wrapper.querySelector('#add');
        }

        get remove(){
            return this.wrapper.querySelector('#remove');
        }

        get counter(){
            return this.wrapper.querySelector('.counter');
        }

        setProperties()
        {
            this.props = this.observe({
                counter: parseInt(this.getUrlParam('counter'), 10) || 1
            })
        }

        initEventListener()
        {
            this.add.addEventListener('click',()=>{ this.updateCounter(1) })
            this.remove.addEventListener('click',()=>{ this.updateCounter(-1) })
            this.counter.append(this.createElement(`<div class="counter__text">kami-counter</div>`));
        }

        updateCounter(to)
        {
            this.props.counter = this.props.counter + to;
            this.setUrlParam('counter',this.props.counter);
            return this;
        }

        test()
        {
            console.log('ok')
        }

        renderHtml()
        {
            return `
                <div class="counter">
                    <button class="counter__btn" id="add">+</button>
                    <button class="counter__btn" id="remove">-</button>
                    <div bind:click="test" class="counter__text" id="counter">${this.props.counter}</div>
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

    customElements.define(Counter.tag, Counter);
}