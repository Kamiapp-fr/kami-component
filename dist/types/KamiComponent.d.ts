import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter';
import '@webcomponents/webcomponentsjs/webcomponents-bundle';
declare abstract class KamiComponent extends HTMLElement {
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
    static readonly tag: void;
    /**
     * @property {URL} url - an URL instance
     */
    protected url: URL;
    /**
     * @property {ShadowRoot} shadow - main shadow root
     */
    protected shadow: ShadowRoot;
    /**
     * Use this property to query your component.
     * @example
     * get counter() {
     *    return this.wrapper.querySelector('#counter');
     * }
     * @property {HTMLDivElement} wrapper - main div wrapper
     */
    protected wrapper: HTMLDivElement;
    /**
     * @property {HTMLStyleElement} styleScope - main style dom
     */
    protected styleScope: HTMLStyleElement;
    /**
     * If this component is observable this property is set as true.
     * @property {Boolean} isObservable - observable state
     */
    protected isObservable: Boolean;
    /**
     * @property {any} props
     */
    protected props: any;
    constructor();
    /**
     * Overide this method to add your event listener.
     * This method will be call if you use the observe() method.
     */
    protected initEventListener(): void;
    /**
     * This methode it use be the child methode to pass
     * all the properties which need the parent to work
     */
    abstract setProperties(): void;
    /**
     * This methode it use be the child methode to pass
     * the html template for the shadows root
     */
    abstract renderHtml(): string;
    /**
     * This methode it use be the child methode to pass
     * the style template for the shadows root
     */
    abstract renderStyle(): string;
    /**
     * This methode update your attribute set in the props object.
     * @param {String} name - the attribute name
     * @param {String} oldValue - the old value
     * @param {String} newValue - the new value
     */
    attributeChangedCallback(name: string, oldValue: any, newValue: any): void;
    /**
     * This methode will observer the target which you have pass in param.
     * When one of the property of your target is set the render() and initEventlistener() will be call.
     * Which reload dynamicaly your component.
     * @param {Object} target - object which will be observed
     * @returns {ProxyConstructor}
     */
    observe(target: Object): ProxyConstructor;
    /**
     * Generate the dom structure and style of your component.
     * It will update the wrapper and styleScope property.
     * @returns {Component} this
     */
    render(): this;
    /**
     * Init the web component
     */
    initComponent(): void;
    /**
     * This method convert your string to an html element like the *document.createElement()* method.
     * There are a litte diff with this. You should pass directly the template of you element.
     * @example
     * this.createElement(`<div id="new" class="test">your dom</div>`)
     *
     * @param {string} html - an string which contain a html element
     * @return {Element | null} html element create.
     */
    protected createElement(html: string): Element | null;
    /**
     * Convert a String into a boolean
     * @param {String} val - the data to convert in bool
     * @returns {Boolean} the boolean converted
     */
    toBoolean(val: any): boolean;
    protected bindAttributes(html: HTMLElement): void;
    protected addBindListener(html: Element, attr: Attr): void;
    protected parseParams(str: string): string[] | null;
    protected parseFunctionName(str: string): string;
    /**
     * Get a param form the url.
     * @param {String} param - the param name
     */
    getUrlParam(param: string): string | null;
    /**
     * Set or update the value of a param into the browser url.
     * @param {Object} object
     * @param {String} object.param - the param name
     * @param {String} object.value - the value
     * @returns {Component} this
     */
    setUrlParam(param: string, value: string): this;
}
export default KamiComponent;
