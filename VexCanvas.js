import React from "react";
import RNVexFlowSVGContext from "./RNVexFlowSVGContext";

class VexCanvas extends React.Component {
    constructor(props) {
        super(props);

        const context = new RNVexFlowSVGContext(props.width, props.height);

        this.state = {
            context,
            elems: context.svg.children,
        };

        this.getContext = this.getContext.bind(this);
    }

    getContext() {
        return this.state.context;
    }

    render() {
        this.props.draw(this);
        return this.state.context.render();
    }
}

export default VexCanvas;