// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
  // import "core-js/fn/array.find"
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter';
import '@webcomponents/webcomponentsjs/webcomponents-bundle';

class Component extends HTMLElement {

    url: URL;
    shadow: ShadowRoot;
    wrapper: HTMLDivElement;
    styleScope: HTMLStyleElement;
    isObservable: Boolean;
    props: any;

   
    constructor() {
        // Always call super first in constructor
        super();
        
        if (new.target === Component) {
            throw new TypeError('Cannot construct Component instances directly');
        }

        this.isObservable = false;

        /**
         * @property {URL} url - the current browser url 
         */
        this.url = new URL(window.location.href);
        
        //init props from children
        this.setProperties();

        /**
         * @property {HTMLElement} shadow - the shadow root of your component
         */
        this.shadow = this.attachShadow({mode: 'open'}); 

        /**
         * Use this dom to get children.
         * Call the querySelector directly from this property.
         * @property {HTMLDivElement} wrapper - main dom of your component
         */
        this.wrapper = document.createElement('div');

        /**
         * @property {HTMLStyleElement}  styleScope - style dom
         */
        this.styleScope = document.createElement('style');

        //set the type for the style dom
        this.styleScope.type = 'text/css';


        //generate the style and dom of your component
        this.render();

        //append your component to the shadow root
        //display the component
        this.initComponent();

        //init all your event listener
        this.initEventListener();
        
    }


    /**
     * This methode update your attribute set in the props object.
     * @param {String} name - the attribute name
     * @param {String} oldValue - the old value
     * @param {String} newValue - the new value
     */
    attributeChangedCallback(name: string, oldValue: any, newValue: any) {
        if(this.isObservable){
            this.props[name] = newValue;
        }
    }

    /**
     * This methode will observer the target which you have pass in param.
     * When one of the property of your target is set the render() and initEventlistener() will be call.
     * Which reload dynamicaly your component.
     * @param {Object} target - object which will be observed
     * @returns {Proxy}  
     */
    observe(target: Object)
    {
        this.isObservable = true;

        //create a proxy to observe your props
        return new Proxy(target,{
            //just return your props
            get: (obj: any, prop: string) => {
                return obj[prop];
            },
            //rerender your component and his listener
            set: (obj, prop, value) => {
                //set the props value
                obj[prop] = value;

                //rerender the component
                this.render();

                //reload listener
                this.initEventListener();
                
                return true;
            }
        }); 
    }

    /**
     * Generate the dom structure and style of your component.
     * It will update the wrapper and styleScope property.
     * @returns {Component} this
     */
    render()
    {
        //reload dom structure
        this.wrapper.innerHTML = this.renderHtml();
        
        //reload style
        this.styleScope.textContent  = this.renderStyle();

        return this;
    }

    /**
     * Overide this method to add your event listener.
     * This method will be call if you use the observe() method. 
     */
    initEventListener(){}

    /**
     * This methode it use be the child methode to pass
     * all the properties which need the parent to work
     */
    setProperties(){}

    /**
     * This methode it use be the child methode to pass
     * the html template for the shadows root
     */
    renderHtml()
    {
        return '';
    }

    /**
     * This methode it use be the child methode to pass
     * the style template for the shadows root
     */
    renderStyle()
    {
        return '';
    }
    
    /**
     * Init the web component
     */
    initComponent()
    {
        this.shadow.appendChild(this.styleScope);
        this.shadow.appendChild(this.wrapper);
    }

    /**
     * Convert a String into a boolean
     * @param {String} val - the data to convert in bool
     * @returns {Boolean} the boolean converted 
     */
    toBoolean(val: any)
    {
        let a: any = {
            'true': true,
            'false': false
        };

        return a[val];
    }

    /**
     * Get a param form the url.
     * @param {String} param - the param name
     */
    getUrlParam(param: string)
    {
        return this.url.searchParams.get(param);
    }

    /**
     * Set or update the value of a param into the browser url.
     * @param {Object} object 
     * @param {String} object.param - the param name 
     * @param {String} object.value - the value 
     * @returns {Component} this
     */
    setUrlParam(param: string,value: string)
    {
        //boolean to check if a update url is needed
        let newUrl = false;
        
        if(value.toString() != ''){
            //check if the param already exist
            this.getUrlParam(param) ?
                //update the param
                this.url.searchParams.set(param,value) :
                //add the param
                this.url.searchParams.append(param,value);
            
            //update url is needed
            newUrl = true;
        }

        //check if value param is empty
        if(value.toString() == '' && this.getUrlParam(param) && !newUrl){

            //delete a param
            this.url.searchParams.delete(param);

            //update url is needed
            newUrl = true;
        }

        if(newUrl == true){
            //update the browser url
            window.history.pushState({}, '', this.url.toString());
        }

        return this;
    }


}



export default Component
