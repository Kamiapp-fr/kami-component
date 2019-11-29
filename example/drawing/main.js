window.onload = function(){
    class Drawing extends KamiComponent
    {
        constructor()
        {
            super();
            this.position = {
                x: 0,
                y: 0
            }
        }

        static get tag(){
            return 'drawing-exemple';
        }

        get drawing(){
            return this.wrapper.querySelector('.drawing');
        }

        setProperties()
        {
            this.color= this.getAttribute('color') || 'black';
        }

        connectedCallback()
        {
            this.ctx = this.drawing.getContext('2d');
            this.resize();
        }

        draw(event){
            if (event.buttons !== 1) return;
            this.ctx.beginPath(); // begin
            this.ctx.lineWidth = 5;
            this.ctx.lineCap = 'round';
            this.ctx.strokeStyle = this.color;
            this.ctx.moveTo(this.position.x, this.position.y); // from
            this.setPosition(event);
            this.ctx.lineTo(this.position.x, this.position.y); // to
            this.ctx.stroke(); // draw it!
        }

        resize() {
            this.ctx.canvas.width = window.innerWidth;
            this.ctx.canvas.height = window.innerHeight;
        }

        setPosition(event) {
            this.position.x = event.clientX;
            this.position.y = event.clientY;
        }

        renderHtml()
        {
            return `
                <canvas 
                    bind:mousemove="draw" 
                    bind:mousedown="setPosition"
                    bind:mouseup="setPosition"
                    class="drawing">
                </canvas>
            `;        
        }

        renderStyle()
        {
            return `
                .drawing{
                    position: fixed;
                }
            `;
        }
    }

    customElements.define(Drawing.tag, Drawing);
}