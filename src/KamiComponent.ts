// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter'
import '@webcomponents/webcomponentsjs/webcomponents-bundle'

abstract class KamiComponent extends HTMLElement {

  /**
   * You should override this getter to return your own tag name for your component.
   * @example
   * // counter.js
   * static get tag(){
   *    return 'counter-example';
   * }
   * 
   * @example
   * // index.html
   * customElements.define(Counter.tag, Counter);
   * 
   * @static
   * @property {string} tag - tag name
   */
  static get tag() {
    throw new Error('Your component should have a tag !')
  }

  /**
   * @property {URL} url - an URL instance
   */
  protected url: URL

  /**
   * @property {ShadowRoot} shadow - main shadow root
   */
  protected shadow: ShadowRoot

  /**
   * Use this property to query your component.
   * @example
   * get counter() {
   *    return this.wrapper.querySelector('#counter');
   * }
   * @property {HTMLDivElement} wrapper - main div wrapper
   */
  protected wrapper: HTMLDivElement

  /**
   * @property {HTMLStyleElement} styleScope - main style dom
   */
  protected styleScope: HTMLStyleElement

  /**
   * If this component is observable this property is set as true.
   * @property {Boolean} isObservable - observable state 
   */
  protected isObservable: Boolean

  /**
   * @property {any} props
   */
  protected props: any

  constructor() {
    // Always call super first in constructor
    super()

    this.isObservable = false

    /**
     * @property {URL} url - the current browser url
     */
    this.url = new URL(window.location.href)

    // init props from children
    this.setProperties()

    /**
     * @property {HTMLElement} shadow - the shadow root of your component
     */
    this.shadow = this.attachShadow({ mode: 'open' })

    /**
     * Use this dom to get children.
     * Call the querySelector directly from this property.
     * @property {HTMLDivElement} wrapper - main dom of your component
     */
    this.wrapper = document.createElement('div')

    /**
     * @property {HTMLStyleElement}  styleScope - style dom
     */
    this.styleScope = document.createElement('style')

    // set the type for the style dom
    // tslint:disable-next-line: deprecation
    this.styleScope.type = 'text/css'

    // generate the style and dom of your component
    this.render()

    // append your component to the shadow root
    // display the component
    this.initComponent()

    // init all your event listener
    this.initEventListener()
  }

  /**
   * Overide this method to add your event listener.
   * This method will be call if you use the observe() method.
   */
  protected initEventListener(): void {
    /**
     * Init your listener here.
     */
  } 

  /**
   * This methode it use be the child methode to pass
   * all the properties which need the parent to work
   */
  abstract setProperties(): void

  /**
   * This methode it use be the child methode to pass
   * the html template for the shadows root
   */
  abstract renderHtml(): string

  /**
   * This methode it use be the child methode to pass
   * the style template for the shadows root
   */
  abstract renderStyle(): string

  /**
   * This methode update your attribute set in the props object.
   * @param {String} name - the attribute name
   * @param {String} oldValue - the old value
   * @param {String} newValue - the new value
   */
  attributeChangedCallback(name: string, oldValue: any, newValue: any): void {
    if (this.isObservable) {
      this.props[name] = newValue
    }
  }

  /**
   * This methode will observer the target which you have pass in param.
   * When one of the property of your target is set the render() and initEventlistener() will be call.
   * Which reload dynamicaly your component.
   * @param {Object} target - object which will be observed
   * @returns {ProxyConstructor}
   */
  observe(target: Object): ProxyConstructor {
    this.isObservable = true

    // create a proxy to observe your props
    return new Proxy(target, {
      // just return your props
      get: (obj: any, prop: string) => {
        return obj[prop]
      },
      // rerender your component and his listener
      set: (obj, prop, value) => {
        // set the props value
        obj[prop] = value

        // rerender the component
        this.render()

        // reload listener
        this.initEventListener()

        return true
      }
    })
  }

  /**
   * Generate the dom structure and style of your component.
   * It will update the wrapper and styleScope property.
   * @returns {Component} this
   */
  render(): this {
    // reload dom structure
    this.wrapper.innerHTML = this.renderHtml();

    // reload style
    this.styleScope.textContent = this.renderStyle();

    // bind attribute to all element in the wrapper
    this.bindAttributes(this.wrapper);

    return this
  }

  /**
   * Init the web component
   */
  initComponent(): void {
    this.shadow.appendChild(this.styleScope)
    this.shadow.appendChild(this.wrapper)
  }

  /**
   * This method convert your string to an html element like the *document.createElement()* method.
   * There are a litte diff with this. You should pass directly the template of you element.
   * @example
   * this.createElement(`<div id="new" class="test">your dom</div>`)
   * 
   * @param {string} html - an string which contain a html element
   * @return {Element | null} html element create. 
   */
  protected createElement(html: string): Element | null {
    let element: Element = document.createElement('div') as Element;
    element.innerHTML = html;
    return element.firstElementChild;
  }

  /**
   * Convert a String into a boolean
   * @param {String} val - the data to convert in bool
   * @returns {Boolean} the boolean converted
   */
  toBoolean(val: any): boolean {
    let a: any = {
      true: true,
      false: false
    }

    return a[val]
  }

  /**
   * This method will parse all element into the main HTMLelement.
   * if an element have an attribute which begin by "bind:" it will call the *addBindsListener()* method
   * with the element and the attribute in params.
   * else nothing happens.
   * @param {HTMLElement} html - parent element
   * @return {void}
   */
  protected bindAttributes(html: HTMLElement): void {
    // parse all child element
    html.querySelectorAll('*').forEach((el: Element) => {

      // parse all attributes. 
      Array.from(el.attributes).forEach((attr: Attr) => {
      
        // add listeners only if the attr begin by bind:
        if(attr.nodeName.startsWith('bind:')){
          this.addBindsListener(el,attr)
        }
      })
    })
  }

  /**
   * Parse all functions in the attr params and call the *bindListener* for each function.
   * @param {Element} html - element which will add listener
   * @param {Attr} attr - attr to parse
   * @return {void}
   */
  protected addBindsListener(html: Element,attr: Attr): void {
    if (attr.nodeValue) {
      
      // parse the type of the listener
      const type: string = attr.nodeName.split(':')[1];

      // parse the function to call from the attr nodeValue
      attr.nodeValue!.split(';').forEach(functionToCall => {
        this.bindListener(html, functionToCall.replace(/ /g,''), type);
      })
    }
  }

  /**
   * Parse the function name to get params and add listener to the Element.
   * @param {Element} html - element which will add listener
   * @param {string} functionToCall - name of the function to call
   * @param {string} type - type of listener 
   * @return {void}
   */
  protected bindListener(html: Element, functionToCall: string, type: string){
    if (functionToCall) {
      // parse function name.
      const functionName: string = this.parseFunctionName(functionToCall);
      
      // parse params.
      const params = this.parseParams(functionToCall);
      
      // get the function to call.
      const event = (this as {[key: string]: any} )[functionName].bind(this);
      
      // add listener only if event is a function.
      if (typeof event === 'function') {
        html.addEventListener(type,(e)=>{
          params ? event(...params) : event();
        })
      } else {
        throw new TypeError(`${functionToCall} is not a function !`)
      }
    }
  }

  /**
   * Get all params from a string function.
   * @param {string} str - function name with param in string 
   * @return {string[]|null} all params in the function
   * 
   * @example 
   * this.parseParams('test') // return null
   * this.parseParams('test()') // return null
   * this.parseParams('test(10)') // return ['10']
   * this.parseParams('test(10,12)') // return ['10','12']
   */
  protected parseParams(str: string): string[] | null{
    const args = /\(\s*([^)]+?)\s*\)/.exec(str);
    return args && args[1] ?
      args[1].split(/\s*,\s*/) : null;
  }

  /**
   * Get function name.
   * @param {string} str - function name with param in string 
   * @returns {string} function name
   * 
   * @example
   * this.parseFunctionName('test') // return 'test'
   * this.parseFunctionName('test()') // return 'test'
   * this.parseFunctionName('test(10)') // return 'test'
   */
  protected parseFunctionName(str: string) {
    return str.split('(')[0];
  }

  /**
   * Get a param form the url.
   * @param {String} param - the param name
   */
  getUrlParam(param: string): string | null {
    return this.url.searchParams.get(param)
  }

  /**
   * Set or update the value of a param into the browser url.
   * @param {Object} object
   * @param {String} object.param - the param name
   * @param {String} object.value - the value
   * @returns {Component} this
   */
  setUrlParam(param: string, value: string): this {
    // boolean to check if a update url is needed
    let newUrl = false

    if (value.toString() !== '') {
      // check if the param already exist
      this.getUrlParam(param)
        ? // update the param
          this.url.searchParams.set(param, value)
        : // add the param
          this.url.searchParams.append(param, value)

      // update url is needed
      newUrl = true
    }

    // check if value param is empty
    if (value.toString() === '' && this.getUrlParam(param) && !newUrl) {
      // delete a param
      this.url.searchParams.delete(param)

      // update url is needed
      newUrl = true
    }

    if (newUrl === true) {
      // update the browser url
      window.history.pushState({}, '', this.url.toString())
    }

    return this
  }
}

export default KamiComponent
