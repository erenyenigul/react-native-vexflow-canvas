import React from "react";
import { SVGContext } from "vexflow/src/svgcontext";
import RNVexFlowSVGContext from "./RNVexFlowContext";
import Svg, { Path, Rect, G, Text } from "react-native-svg";

class VexCanvas extends React.Component {
    constructor(props) {
        super(props);

        const context = new RNVexFlowSVGContext(
          props.size
        );

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