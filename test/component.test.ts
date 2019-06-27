import Component from "../src/Component"
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter';
import '@webcomponents/webcomponentsjs/webcomponents-bundle';


describe("Component test", () => {
   
    beforeAll(()=>{
        customElements.define('list-exemple', List);
    })

    it('should create a simple component',()=>{
        let list: HTMLElement = document.createElement('list-exemple');
        expect(list).toBeInstanceOf(HTMLElement)
    })

    it('should get the simple component',()=>{
        document.body.innerHTML = `
            <list-exemple></list-exemple>
        `;

        let list: HTMLElement | null = document.querySelector('list-exemple');
        if(list){
            expect(list).toBeInstanceOf(HTMLElement)
        }
    })
    
})

//Simple component for the test
class List extends Component
{
    protected btn: HTMLElement | null;
    
    constructor()
    {
        super();

        this.btn = null;
    }

    setProperties()
    {
        this.props = this.observe({
            counter: 1
        })
    }

    initEventListener(){
        this.btn = this.wrapper.querySelector('#add');
        if(this.btn){
            this.btn.addEventListener('click',()=>{
                this.props.counter ++;
            })
        }
        
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