import React from "react";
import { SVGContext } from "vexflow";
import Svg, { Text, Path, Rect, G } from "react-native-svg";

const propMap = {
    "font-family": "fontFamily",
    "font-size": "fontSize",
    "font-weight": "fontWeight",
    class: "className",
};

class ContextElement {
    constructor(props) {
        this.children = [];
        this.props = { style: {}, key: 0, ...props };
    }

    get style() {
        return this.props.style;
    }

    applyProps(attributes) {
        this.props = { ...this.props, ...attributes };
    }

    setAttribute(propertyName, value) {
        if (propertyName === "class") propertyName = "className";

        this.props[propertyName] = value;
    }

    appendChild(elem) {
        this.children.push(elem);
    }

    _doPropsAdjustment() {
        Object.entries(propMap).forEach(([key, value]) => {
            this.props[value] = this.props[key];
            delete this.props[key];
        });
    }

    toReactElement() {
        this._doPropsAdjustment();
        return this._toReactElement();
    }
}

class DivContextElement extends ContextElement {
    constructor(props) {
        super({ ...props, svgElementType: "div" });
    }

    _toReactElement() {
        const childrenReactElements = this.children.map((child) =>
            child.toReactElement()
        );

        return React.createElement("div", this.props, childrenReactElements);
    }
}

class SVGContextElement extends ContextElement {
    constructor(props) {
        super({
            ...props,
            xmlns: "http://www.w3.org/2000/svg",
            svgElementType: "svg",
        });
    }

    _toReactElement() {
        const childrenReactElements = this.children.map((child) =>
            child.toReactElement()
        );

        return React.createElement(Svg, this.props, childrenReactElements);
    }
}

class PathContextElement extends ContextElement {
    constructor(props) {
        super({ ...props, svgElementType: "path" });
    }

    _toReactElement() {
        const childrenReactElements = this.children.map((child) =>
            child.toReactElement()
        );

        delete this.props["x"];
        delete this.props["y"];

        return React.createElement(Path, this.props, childrenReactElements);
    }
}

class RectContextElement extends ContextElement {
    constructor(props) {
        super({ ...props, svgElementType: "rect" });
    }

    _toReactElement() {
        const childrenReactElements = this.children.map((child) =>
            child.toReactElement()
        );

        return React.createElement(Rect, this.props, childrenReactElements);
    }
}

class GContextElement extends ContextElement {
    constructor(props) {
        super({ ...props, svgElementType: "g" });
    }

    _toReactElement() {
        const childrenReactElements = this.children.map((child) =>
            child.toReactElement()
        );

        return React.createElement(G, this.props, childrenReactElements);
    }
}

class TextContextElement extends ContextElement {
    constructor(props) {
        super({ ...props, svgElementType: "text" });
    }

    _toReactElement() {
        return React.createElement(Text, this.props, this.textContent);
    }
}

const contextClasses = {
    svg: SVGContextElement,
    rect: RectContextElement,
    path: PathContextElement,
    g: GContextElement,
    text: TextContextElement,
};

class RNVexFlowSVGContext extends SVGContext {
    constructor(width, height) {
        super(new DivContextElement(), "div");

        this.svg.applyProps({
            width: width ? width : 250,
            height: height ? height : 250,
        });
        this.nextElementKey = 1;
    }

    create(svgElementType) {
        const key = this.nextElementKey ? this.nextElementKey++ : 0;

        return new contextClasses[svgElementType]({ key: key });
    }

    /**
     * Overriden so that functions inherited from SVGContext can use it.
     * @param element  Element to add attributes to.
     * @param attributes   Desired attributes.
     */
    applyAttributes(element, attributes) {
        element.applyProps(attributes);
    }

    add(element) {
        this.parent.children.push(element);
    }

    clear() {
        this.svg.children = [];
    }

    render() {
        return this.svg.toReactElement();
    }
}

export default RNVexFlowSVGContext;
