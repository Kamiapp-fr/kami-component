"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
require("@webcomponents/webcomponentsjs/custom-elements-es5-adapter");
require("@webcomponents/webcomponentsjs/webcomponents-bundle");
var Component = /** @class */ (function (_super) {
    __extends(Component, _super);
    function Component() {
        var _this = 
        // Always call super first in constructor
        _super.call(this) || this;
        _this.isObservable = false;
        /**
         * @property {URL} url - the current browser url
         */
        _this.url = new URL(window.location.href);
        //init props from children
        _this.setProperties();
        /**
         * @property {HTMLElement} shadow - the shadow root of your component
         */
        _this.shadow = _this.attachShadow({ mode: 'open' });
        /**
         * Use this dom to get children.
         * Call the querySelector directly from this property.
         * @property {HTMLDivElement} wrapper - main dom of your component
         */
        _this.wrapper = document.createElement('div');
        /**
         * @property {HTMLStyleElement}  styleScope - style dom
         */
        _this.styleScope = document.createElement('style');
        //set the type for the style dom
        _this.styleScope.type = 'text/css';
        //generate the style and dom of your component
        _this.render();
        //append your component to the shadow root
        //display the component
        _this.initComponent();
        //init all your event listener
        _this.initEventListener();
        return _this;
    }
    /**
     * This methode update your attribute set in the props object.
     * @param {String} name - the attribute name
     * @param {String} oldValue - the old value
     * @param {String} newValue - the new value
     */
    Component.prototype.attributeChangedCallback = function (name, oldValue, newValue) {
        if (this.isObservable) {
            this.props[name] = newValue;
        }
    };
    /**
     * This methode will observer the target which you have pass in param.
     * When one of the property of your target is set the render() and initEventlistener() will be call.
     * Which reload dynamicaly your component.
     * @param {Object} target - object which will be observed
     * @returns {ProxyConstructor}
     */
    Component.prototype.observe = function (target) {
        var _this = this;
        this.isObservable = true;
        //create a proxy to observe your props
        return new Proxy(target, {
            //just return your props
            get: function (obj, prop) {
                return obj[prop];
            },
            //rerender your component and his listener
            set: function (obj, prop, value) {
                //set the props value
                obj[prop] = value;
                //rerender the component
                _this.render();
                //reload listener
                _this.initEventListener();
                return true;
            }
        });
    };
    /**
     * Generate the dom structure and style of your component.
     * It will update the wrapper and styleScope property.
     * @returns {Component} this
     */
    Component.prototype.render = function () {
        //reload dom structure
        this.wrapper.innerHTML = this.renderHtml();
        //reload style
        this.styleScope.textContent = this.renderStyle();
        return this;
    };
    /**
     * Init the web component
     */
    Component.prototype.initComponent = function () {
        this.shadow.appendChild(this.styleScope);
        this.shadow.appendChild(this.wrapper);
    };
    /**
     * Convert a String into a boolean
     * @param {String} val - the data to convert in bool
     * @returns {Boolean} the boolean converted
     */
    Component.prototype.toBoolean = function (val) {
        var a = {
            'true': true,
            'false': false
        };
        return a[val];
    };
    /**
     * Get a param form the url.
     * @param {String} param - the param name
     */
    Component.prototype.getUrlParam = function (param) {
        return this.url.searchParams.get(param);
    };
    /**
     * Set or update the value of a param into the browser url.
     * @param {Object} object
     * @param {String} object.param - the param name
     * @param {String} object.value - the value
     * @returns {Component} this
     */
    Component.prototype.setUrlParam = function (param, value) {
        //boolean to check if a update url is needed
        var newUrl = false;
        if (value.toString() != '') {
            //check if the param already exist
            this.getUrlParam(param) ?
                //update the param
                this.url.searchParams.set(param, value) :
                //add the param
                this.url.searchParams.append(param, value);
            //update url is needed
            newUrl = true;
        }
        //check if value param is empty
        if (value.toString() == '' && this.getUrlParam(param) && !newUrl) {
            //delete a param
            this.url.searchParams.delete(param);
            //update url is needed
            newUrl = true;
        }
        if (newUrl == true) {
            //update the browser url
            window.history.pushState({}, '', this.url.toString());
        }
        return this;
    };
    return Component;
}(HTMLElement));
exports.default = Component;
//# sourceMappingURL=Component.js.map